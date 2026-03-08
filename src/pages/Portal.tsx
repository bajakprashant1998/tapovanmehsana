import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  User, BookOpen, CreditCard, Bell, Calendar, ClipboardCheck,
  LogOut, GraduationCap, Clock, CheckCircle, XCircle
} from "lucide-react";
import logo from "@/assets/tis-logo.png";

const Portal = () => {
  const { user, loading, hasRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [homework, setHomework] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      loadData();
    }
  }, [user, loading]);

  const loadData = async () => {
    if (!user) return;

    // Profile
    const { data: p } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    setProfile(p);

    // Students (as parent or self)
    const { data: s } = await supabase.from("students").select("*");
    setStudents(s || []);

    // Announcements
    const { data: a } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(5);
    setAnnouncements(a || []);

    // Load student-specific data
    if (s && s.length > 0) {
      const studentIds = s.map((st) => st.id);

      const { data: hw } = await supabase.from("homework").select("*").in("class", s.map((st) => st.class)).order("due_date", { ascending: false }).limit(10);
      setHomework(hw || []);

      const { data: att } = await supabase.from("attendance").select("*").in("student_id", studentIds).order("date", { ascending: false }).limit(30);
      setAttendance(att || []);

      const { data: f } = await supabase.from("fee_payments").select("*").in("student_id", studentIds).order("due_date", { ascending: false });
      setFees(f || []);

      const { data: r } = await supabase.from("exam_results").select("*").in("student_id", studentIds).order("created_at", { ascending: false });
      setResults(r || []);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = hasRole("admin");
  const isTeacher = hasRole("teacher");

  const presentDays = attendance.filter((a) => a.status === "present").length;
  const totalDays = attendance.length;
  const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  const pendingFees = fees.filter((f) => f.status === "pending" || f.status === "overdue");
  const totalPending = pendingFees.reduce((sum, f) => sum + Number(f.amount), 0);

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-custom flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Tapovan" className="h-10 brightness-0 invert" />
            <span className="font-display font-bold text-lg hidden sm:block">Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            {(isAdmin || isTeacher) && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Admin Panel
                </Button>
              </Link>
            )}
            <span className="text-sm text-secondary-foreground/70 hidden sm:block">{profile?.full_name || user.email}</span>
            <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate("/"); }} className="text-secondary-foreground hover:bg-secondary-foreground/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <AnimatedSection>
          <h1 className="font-display text-3xl font-extrabold text-foreground mb-1">
            Welcome, {profile?.full_name || "User"}
          </h1>
          <p className="text-muted-foreground mb-8">Here's your dashboard overview</p>
        </AnimatedSection>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: GraduationCap, label: "Students", value: students.length, color: "text-primary" },
            { icon: ClipboardCheck, label: "Attendance", value: `${attendancePercent}%`, color: "text-green-600" },
            { icon: CreditCard, label: "Pending Fees", value: `₹${totalPending.toLocaleString()}`, color: "text-destructive" },
            { icon: BookOpen, label: "Homework", value: homework.length, color: "text-secondary" },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <Card>
                <CardContent className="p-5 text-center">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="font-display text-2xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students */}
          <AnimatedSection delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" /> My Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No students linked to your account yet.</p>
                ) : (
                  <div className="space-y-3">
                    {students.map((s) => (
                      <div key={s.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{s.full_name}</p>
                          <p className="text-xs text-muted-foreground">Class {s.class} {s.section} • Roll #{s.roll_number || "—"}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {s.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Announcements */}
          <AnimatedSection delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-primary" /> Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {announcements.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No announcements yet.</p>
                ) : (
                  <div className="space-y-3">
                    {announcements.map((a) => (
                      <div key={a.id} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-foreground text-sm">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{a.content?.substring(0, 100)}{a.content?.length > 100 ? "..." : ""}</p>
                        <p className="text-xs text-primary mt-1">{new Date(a.created_at).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Attendance */}
          <AnimatedSection delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ClipboardCheck className="h-5 w-5 text-primary" /> Recent Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {attendance.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No attendance records yet.</p>
                ) : (
                  <div className="space-y-2">
                    {attendance.slice(0, 10).map((a) => (
                      <div key={a.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                        <span className="text-sm text-foreground">{new Date(a.date).toLocaleDateString()}</span>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${a.status === "present" ? "text-green-600" : "text-red-600"}`}>
                          {a.status === "present" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Fee Payments */}
          <AnimatedSection delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" /> Fee Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {fees.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No fee records yet.</p>
                ) : (
                  <div className="space-y-2">
                    {fees.slice(0, 8).map((f) => (
                      <div key={f.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">₹{Number(f.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Due: {new Date(f.due_date).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          f.status === "paid" ? "bg-green-100 text-green-700" :
                          f.status === "overdue" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {f.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Homework */}
          <AnimatedSection delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" /> Homework & Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {homework.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No homework assigned yet.</p>
                ) : (
                  <div className="space-y-2">
                    {homework.slice(0, 8).map((h) => (
                      <div key={h.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-foreground">{h.title}</p>
                            <p className="text-xs text-muted-foreground">{h.subject} • Class {h.class}</p>
                          </div>
                          <span className="text-xs text-primary flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(h.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Exam Results */}
          <AnimatedSection delay={0.6}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5 text-primary" /> Exam Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No exam results published yet.</p>
                ) : (
                  <div className="space-y-2">
                    {results.slice(0, 8).map((r) => (
                      <div key={r.id} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.subject}</p>
                          <p className="text-xs text-muted-foreground">{r.exam_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">{r.marks_obtained}/{r.total_marks}</p>
                          {r.grade && <p className="text-xs text-primary font-semibold">{r.grade}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Portal;
