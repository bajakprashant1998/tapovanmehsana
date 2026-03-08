import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, X, Calendar, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SECTIONS = ["A", "B", "C", "D"];

interface TimetableEntry {
  id?: string;
  class: string;
  section: string;
  day_of_week: string;
  period_number: number;
  start_time: string;
  end_time: string;
  subject: string;
  teacher_name: string;
  room: string;
}

const emptyEntry: TimetableEntry = {
  class: "1",
  section: "A",
  day_of_week: "Monday",
  period_number: 1,
  start_time: "08:00",
  end_time: "08:45",
  subject: "",
  teacher_name: "",
  room: "",
};

const TimetableManager = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<any[]>([]);
  const [filterClass, setFilterClass] = useState("1");
  const [filterSection, setFilterSection] = useState("A");
  const [filterDay, setFilterDay] = useState("Monday");
  const [form, setForm] = useState<TimetableEntry>({ ...emptyEntry });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadEntries();
  }, [filterClass, filterSection, filterDay]);

  const loadEntries = async () => {
    const { data } = await supabase
      .from("timetable")
      .select("*")
      .eq("class", filterClass)
      .eq("section", filterSection)
      .eq("day_of_week", filterDay)
      .order("period_number", { ascending: true });
    setEntries(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject) {
      toast({ title: "Subject is required", variant: "destructive" });
      return;
    }

    if (editingId) {
      const { error } = await supabase.from("timetable").update({
        class: form.class,
        section: form.section,
        day_of_week: form.day_of_week,
        period_number: form.period_number,
        start_time: form.start_time,
        end_time: form.end_time,
        subject: form.subject,
        teacher_name: form.teacher_name || null,
        room: form.room || null,
      }).eq("id", editingId);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Period updated!" });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("timetable").insert({
        class: form.class,
        section: form.section,
        day_of_week: form.day_of_week,
        period_number: form.period_number,
        start_time: form.start_time,
        end_time: form.end_time,
        subject: form.subject,
        teacher_name: form.teacher_name || null,
        room: form.room || null,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Period added!" });
      }
    }

    setForm({ ...emptyEntry, class: filterClass, section: filterSection, day_of_week: filterDay });
    setShowForm(false);
    loadEntries();
  };

  const startEdit = (entry: any) => {
    setForm({
      class: entry.class,
      section: entry.section || "A",
      day_of_week: entry.day_of_week,
      period_number: entry.period_number,
      start_time: entry.start_time,
      end_time: entry.end_time,
      subject: entry.subject,
      teacher_name: entry.teacher_name || "",
      room: entry.room || "",
    });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const deleteEntry = async (id: string) => {
    await supabase.from("timetable").delete().eq("id", id);
    toast({ title: "Period deleted" });
    loadEntries();
  };

  const openNewForm = () => {
    setForm({ ...emptyEntry, class: filterClass, section: filterSection, day_of_week: filterDay, period_number: entries.length + 1 });
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-display text-2xl font-extrabold text-foreground">Timetable Management</h2>
        <Button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-1" /> Add Period
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Class</Label>
          <Select value={filterClass} onValueChange={setFilterClass}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CLASSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Section</Label>
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SECTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Day</Label>
          <div className="flex gap-1">
            {DAYS.map(d => (
              <Button
                key={d}
                size="sm"
                variant={filterDay === d ? "default" : "outline"}
                onClick={() => setFilterDay(d)}
                className="text-xs px-2"
              >
                {d.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                {editingId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Edit Period" : "Add New Period"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); setEditingId(null); }}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Period #</Label>
                <Input type="number" min={1} max={10} value={form.period_number} onChange={e => setForm({ ...form, period_number: Number(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" value={form.start_time} onChange={e => setForm({ ...form, start_time: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" value={form.end_time} onChange={e => setForm({ ...form, end_time: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required placeholder="e.g. Mathematics" />
              </div>
              <div className="space-y-2">
                <Label>Teacher</Label>
                <Input value={form.teacher_name} onChange={e => setForm({ ...form, teacher_name: e.target.value })} placeholder="Teacher name" />
              </div>
              <div className="space-y-2">
                <Label>Room</Label>
                <Input value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} placeholder="e.g. Room 101" />
              </div>
              <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="h-4 w-4 mr-1" /> {editingId ? "Update" : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Schedule Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Class {filterClass}-{filterSection} — {filterDay}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No periods scheduled. Click "Add Period" to create one.</p>
          ) : (
            <div className="divide-y divide-border">
              {entries.map((entry) => (
                <div key={entry.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-primary text-sm">{entry.period_number}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{entry.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{entry.start_time} – {entry.end_time}</span>
                        {entry.teacher_name && <span>• {entry.teacher_name}</span>}
                        {entry.room && <span>• {entry.room}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(entry)} className="text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteEntry(entry.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableManager;
