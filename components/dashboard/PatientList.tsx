"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/utils/supabase/client"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Patient = {
  id: string
  phone_number: string
  name: string | null
  due_date: string | null
  gestational_week: number | null
  risk_level: string | null
  language: string | null
  created_at: string
}

function RiskBadge({ riskLevel }: { riskLevel: string | null }) {
  const level = (riskLevel ?? "low").toLowerCase()
  if (level === "critical" || level === "high") {
    return (
      <Badge variant="destructive" className="animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        {level}
      </Badge>
    )
  }
  if (level === "medium") {
    return (
      <Badge
        variant="outline"
        className="border-amber-400 bg-amber-100 text-amber-800 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-200"
      >
        {level}
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="border-emerald-400 bg-emerald-100 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-200"
    >
      {level}
    </Badge>
  )
}

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchPatients = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("patients")
      .select("id, phone_number, name, due_date, gestational_week, risk_level, language, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Failed to fetch patients:", error)
      return
    }
    setPatients((data as Patient[]) ?? [])
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      await fetchPatients()
      if (!cancelled) setLoading(false)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [fetchPatients])

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel("patients-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "patients" },
        () => {
          fetchPatients()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPatients])

  const filtered = patients.filter((p) => {
    if (!search.trim()) return true
    const q = search.trim().toLowerCase()
    const name = (p.name ?? "").toLowerCase()
    const phone = (p.phone_number ?? "").toLowerCase()
    return name.includes(q) || phone.includes(q)
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search by name or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label="Search patients"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Gest. week</TableHead>
              <TableHead>Risk level</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No patients found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name ?? "—"}</TableCell>
                  <TableCell>{p.phone_number}</TableCell>
                  <TableCell>
                    {p.due_date
                      ? new Date(p.due_date).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell>{p.gestational_week ?? "—"}</TableCell>
                  <TableCell>
                    <RiskBadge riskLevel={p.risk_level} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(p.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
