import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Users, ClipboardCheck, BookOpen, LogOut, ArrowLeft,
  CheckCircle, XCircle, Clock, Plus, Calendar, Search
} from "lucide-react";
import logo from "@/assets/tis-logo.png";

type Tab = "attendance" | "homework" | "students";

const TeacherDashboard = () => {
  const { user, loading, hasRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("attendance");

  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("A");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, string>>({});
  const [existingAttendance, setExistingAttendance] = useState<any[]>([]);
  const [savingAttendance, setSavingAttendance] = useState(false);

  // Homework
  const [homeworkList, setHomeworkList] = useState<any[]>([]);
  const [hwForm, setHwForm] = useState({
    title: "", subject: "", class: "", section: "A", due_date: "", description: ""
  });
  const [savingHw, setSavingHw] = useState(false);

  // Available classes
  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  useEffect(() => {
    if (!loading && (!user || (!hasRole("teacher") && !hasRole("admin")))) {
      navigate("/portal");
      return;
    }
    if (user) {
      loadHomework();
    }
  }, [user, loading]);

  useEffect(() => {
    if (selectedClass) {
      loadStudents();
    }
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    if (selectedClass && students.length > 0) {
      loadExistingAttendance();
    }
  }, [attendanceDate, students]);

  const loadStudents = async () => {
    let query = supabase.from("students").select("*").eq("class", selectedClass).eq("is_active", true);
    if (selectedSection) query = query.eq("section", selectedSection);
    const { data } = await query.order("full_name");
    setStudents(data || []);
    // Reset attendance map
    const map: Record<string, string> = {};
    (data || []).forEach((s) => { map[s.id] = "present"; });
    setAttendanceMap(map);
  };

  const loadExistingAttendance = async () => {
    if (!students.length) return;
    const studentIds = students.map((s) => s.id);
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .in("student_id", studentIds)
      .eq("date", attendanceDate);
    setExistingAttendance(data || []);
    // Pre-fill attendance map from existing records
    if (data && data.length > 0) {
      const map: Record<string, string> = {};
      students.forEach((s) => { map[s.id] = "present"; });
      data.forEach((a) => { map[a.student_id] = a.status; });
      setAttendanceMap(map);
    }
  };

  const loadHomework = async () => {
    const { data } = await supabase
      .from("homework")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setHomeworkList(data || []);
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }));
  };

  const saveAttendance = async () => {
    if (!selectedClass || students.length === 0) {
      toast({ title: "Select a class first", variant: "destructive" });
      return;
    }
    setSavingAttendance(true);
    try {
      // Delete existing attendance for this date + these students
      const studentIds = students.map((s) => s.id);
      await supabase
        .from("attendance")
        .delete()
        .in("student_id", studentIds)
        .eq("date", attendanceDate);

      // Insert new attendance
      const records = students.map((s) => ({
        student_id: s.id,
        date: attendanceDate,
        status: attendanceMap[s.id] || "present",
        marked_by: user?.id,
      }));
      const { error } = await supabase.from("attendance").insert(records);
      if (error) throw error;
      toast({ title: "Attendance saved successfully!" });
      loadExistingAttendance();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSavingAttendance(false);
    }
  };

  const addHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwForm.title || !hwForm.subject || !hwForm.class || !hwForm.due_date) {
      toast({ title: "Fill all required fields", variant: "destructive" });
      return;
    }
    setSavingHw(true);
    try {
      const { error } = await supabase.from("homework").insert({
        ...hwForm,
        assigned_by: user?.id,
      });
      if (error) throw error;
      toast({ title: "Homework assigned!" });
      setHwForm({ title: "", subject: "", class: "", section: "A", due_date: "", description: "" });
      loadHomework();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSavingHw(false);
    }
  };

  const deleteHomework = async (id: string) => {
    await supabase.from("homework").delete().eq("id", id);
    toast({ title: "Homework deleted" });
    loadHomework();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  const presentCount = Object.values(attendanceMap).filter((v) => v === "present").length;
  const absentCount = Object.values(attendanceMap).filter((v) => v === "absent").length;
  const alreadyMarked = existingAttendance.length > 0;

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "attendance", label: "Mark Attendance", icon: ClipboardCheck },
    { id: "homework", label: "Homework", icon: BookOpen },
    { id: "students", label: "View Students", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Tapovan" className="h-10 brightness-0 invert" />
              <span className="font-display font-bold text-lg hidden sm:block">Teacher Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/portal">
              <Button variant="ghost" size="sm" className="text-secondary-foreground/70 hover:text-secondary-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" /> Portal
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate("/"); }} className="text-secondary-foreground hover:bg-secondary-foreground/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container-custom flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-custom py-8">
        {/* ATTENDANCE TAB */}
        {tab === "attendance" && (
          <div className="space-y-6">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-extrabold text-foreground">Mark Attendance</h2>
            </AnimatedSection>

            {/* Class & Date Selector */}
            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select Class</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>Class {c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {["A", "B", "C", "D"].map((s) => (
                        <option key={s} value={s}>Section {s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={attendanceDate}
                      onChange={(e) => setAttendanceDate(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedClass && students.length > 0 && (
              <AnimatedSection delay={0.1}>
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-lg">
                        Class {selectedClass}-{selectedSection} • {attendanceDate}
                        {alreadyMarked && (
                          <span className="ml-2 text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded-full">
                            Already marked — editing
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" /> {presentCount} Present
                        </span>
                        <span className="flex items-center gap-1 text-destructive">
                          <XCircle className="h-4 w-4" /> {absentCount} Absent
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {students.map((s, i) => (
                        <div
                          key={s.id}
                          onClick={() => toggleAttendance(s.id)}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border ${
                            attendanceMap[s.id] === "present"
                              ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                              : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground w-8">{i + 1}.</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{s.full_name}</p>
                              <p className="text-xs text-muted-foreground">Roll #{s.roll_number || "—"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {attendanceMap[s.id] === "present" ? (
                              <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                <CheckCircle className="h-5 w-5" /> Present
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-sm font-semibold text-destructive">
                                <XCircle className="h-5 w-5" /> Absent
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={saveAttendance}
                      disabled={savingAttendance}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {savingAttendance ? "Saving..." : alreadyMarked ? "Update Attendance" : "Save Attendance"}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}

            {selectedClass && students.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No students found in Class {selectedClass}-{selectedSection}.
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* HOMEWORK TAB */}
        {tab === "homework" && (
          <div className="space-y-6">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-extrabold text-foreground">Assign Homework</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addHomework} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={hwForm.title}
                        onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                        required
                        placeholder="e.g. Chapter 5 Exercises"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject *</Label>
                      <Input
                        value={hwForm.subject}
                        onChange={(e) => setHwForm({ ...hwForm, subject: e.target.value })}
                        required
                        placeholder="e.g. Mathematics"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Class *</Label>
                      <select
                        value={hwForm.class}
                        onChange={(e) => setHwForm({ ...hwForm, class: e.target.value })}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select</option>
                        {classes.map((c) => (
                          <option key={c} value={c}>Class {c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Section</Label>
                      <select
                        value={hwForm.section}
                        onChange={(e) => setHwForm({ ...hwForm, section: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {["A", "B", "C", "D"].map((s) => (
                          <option key={s} value={s}>Section {s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date *</Label>
                      <Input
                        type="date"
                        value={hwForm.due_date}
                        onChange={(e) => setHwForm({ ...hwForm, due_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                      <Label>Description</Label>
                      <Textarea
                        value={hwForm.description}
                        onChange={(e) => setHwForm({ ...hwForm, description: e.target.value })}
                        placeholder="Detailed instructions for the homework..."
                        rows={3}
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <Button type="submit" disabled={savingHw} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="h-4 w-4 mr-1" /> {savingHw ? "Saving..." : "Assign Homework"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Homework List */}
            <AnimatedSection delay={0.2}>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Recent Assignments</h3>
              {homeworkList.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No homework assigned yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {homeworkList.map((h) => (
                    <Card key={h.id}>
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <p className="font-medium text-foreground">{h.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {h.subject} • Class {h.class}-{h.section} • Due: {new Date(h.due_date).toLocaleDateString()}
                          </p>
                          {h.description && (
                            <p className="text-sm text-muted-foreground mt-1">{h.description.substring(0, 100)}{h.description.length > 100 ? "..." : ""}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteHomework(h.id)}
                          className="text-destructive hover:text-destructive shrink-0"
                        >
                          <XCircle className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>
        )}

        {/* STUDENTS TAB */}
        {tab === "students" && (
          <div className="space-y-6">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-extrabold text-foreground">View Students</h2>
            </AnimatedSection>

            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select Class</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>Class {c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {["A", "B", "C", "D"].map((s) => (
                        <option key={s} value={s}>Section {s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedClass && students.length > 0 && (
              <AnimatedSection delay={0.1}>
                <div className="space-y-2">
                  {students.map((s, i) => (
                    <Card key={s.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground w-8">{i + 1}.</span>
                          <div>
                            <p className="font-medium text-foreground">{s.full_name}</p>
                            <p className="text-xs text-muted-foreground">
                              Roll #{s.roll_number || "—"} • {s.gender || "—"} • {s.parent_name || "No parent info"}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {s.is_active ? "Active" : "Inactive"}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {selectedClass && students.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No students found in Class {selectedClass}-{selectedSection}.
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
