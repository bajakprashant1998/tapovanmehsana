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
import {
  Users, FileText, CreditCard, BarChart3, Bell, LogOut,
  GraduationCap, Plus, Trash2, Edit, CheckCircle, XCircle, Clock,
  ArrowLeft, Calendar, Save
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tab = "overview" | "admissions" | "students" | "fees" | "announcements" | "timetable";

const Admin = () => {
  const { user, loading, hasRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("overview");

  const [admissions, setAdmissions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [feeStructures, setFeeStructures] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Forms
  const [announcementForm, setAnnouncementForm] = useState({ title: "", content: "", category: "general" });
  const [studentForm, setStudentForm] = useState({
    full_name: "", class: "", section: "A", parent_name: "", parent_phone: "", parent_email: "",
    date_of_birth: "", gender: "Male", is_hostel_student: false
  });

  useEffect(() => {
    if (!loading && (!user || !hasRole("admin"))) {
      navigate("/portal");
      return;
    }
    if (user && hasRole("admin")) {
      loadAllData();
    }
  }, [user, loading, hasRole]);

  const loadAllData = async () => {
    const [a, s, f, fs, ann] = await Promise.all([
      supabase.from("admissions").select("*").order("created_at", { ascending: false }),
      supabase.from("students").select("*").order("created_at", { ascending: false }),
      supabase.from("fee_payments").select("*").order("created_at", { ascending: false }),
      supabase.from("fee_structures").select("*"),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);
    setAdmissions(a.data || []);
    setStudents(s.data || []);
    setFees(f.data || []);
    setFeeStructures(fs.data || []);
    setAnnouncements(ann.data || []);
  };

  const updateAdmissionStatus = async (id: string, status: "pending" | "under_review" | "approved" | "rejected" | "enrolled") => {
    await supabase.from("admissions").update({ status }).eq("id", id);
    toast({ title: `Admission ${status}` });
    loadAllData();
  };

  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("students").insert({
      ...studentForm,
      is_hostel_student: studentForm.is_hostel_student,
      date_of_birth: studentForm.date_of_birth || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student added!" });
      setStudentForm({ full_name: "", class: "", section: "A", parent_name: "", parent_phone: "", parent_email: "", date_of_birth: "", gender: "Male", is_hostel_student: false });
      loadAllData();
    }
  };

  const addAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("announcements").insert({
      ...announcementForm,
      published_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Announcement published!" });
      setAnnouncementForm({ title: "", content: "", category: "general" });
      loadAllData();
    }
  };

  const deleteAnnouncement = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    toast({ title: "Announcement deleted" });
    loadAllData();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-muted"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (!user) return null;

  const totalFeeCollected = fees.filter(f => f.status === "paid").reduce((s, f) => s + Number(f.amount), 0);
  const totalFeePending = fees.filter(f => f.status !== "paid").reduce((s, f) => s + Number(f.amount), 0);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "admissions", label: "Admissions", icon: FileText },
    { id: "students", label: "Students", icon: Users },
    { id: "fees", label: "Fees", icon: CreditCard },
    { id: "announcements", label: "Announcements", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Tapovan" className="h-10 brightness-0 invert" />
              <span className="font-display font-bold text-lg hidden sm:block">Admin Panel</span>
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
        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Students", value: students.length, icon: Users, color: "text-primary" },
                { label: "Admission Requests", value: admissions.filter(a => a.status === "pending").length, icon: FileText, color: "text-yellow-600" },
                { label: "Fee Collected", value: `₹${totalFeeCollected.toLocaleString()}`, icon: CreditCard, color: "text-green-600" },
                { label: "Fee Pending", value: `₹${totalFeePending.toLocaleString()}`, icon: CreditCard, color: "text-destructive" },
              ].map((s, i) => (
                <Card key={i}>
                  <CardContent className="p-5 text-center">
                    <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
                    <p className="font-display text-2xl font-extrabold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Recent Admissions</CardTitle></CardHeader>
                <CardContent>
                  {admissions.slice(0, 5).map((a) => (
                    <div key={a.id} className="flex justify-between items-center p-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{a.student_name}</p>
                        <p className="text-xs text-muted-foreground">Class {a.applying_for_class}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        a.status === "approved" ? "bg-green-100 text-green-700" :
                        a.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>{a.status}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Announcements</CardTitle></CardHeader>
                <CardContent>
                  {announcements.slice(0, 5).map((a) => (
                    <div key={a.id} className="p-2 border-b border-border last:border-0">
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Admissions */}
        {tab === "admissions" && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Admission Requests</h2>
            {admissions.length === 0 ? (
              <p className="text-muted-foreground">No admission requests yet.</p>
            ) : (
              <div className="space-y-3">
                {admissions.map((a) => (
                  <Card key={a.id}>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="space-y-1">
                          <p className="font-display text-lg font-bold text-foreground">{a.student_name}</p>
                          <p className="text-sm text-muted-foreground">Parent: {a.parent_name} • {a.email} • {a.phone}</p>
                          <p className="text-sm text-muted-foreground">Class: {a.applying_for_class} {a.previous_school ? `• From: ${a.previous_school}` : ""}</p>
                          {a.message && <p className="text-sm text-muted-foreground italic">"{a.message}"</p>}
                          <p className="text-xs text-muted-foreground">Submitted: {new Date(a.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                            a.status === "approved" ? "bg-green-100 text-green-700" :
                            a.status === "rejected" ? "bg-red-100 text-red-700" :
                            a.status === "under_review" ? "bg-blue-100 text-blue-700" :
                            a.status === "enrolled" ? "bg-primary/10 text-primary" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>{a.status}</span>
                          {a.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => updateAdmissionStatus(a.id, "under_review")}>
                                <Clock className="h-3 w-3 mr-1" /> Review
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateAdmissionStatus(a.id, "approved")}>
                                <CheckCircle className="h-3 w-3 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => updateAdmissionStatus(a.id, "rejected")}>
                                <XCircle className="h-3 w-3 mr-1" /> Reject
                              </Button>
                            </>
                          )}
                          {a.status === "under_review" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateAdmissionStatus(a.id, "approved")}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={() => updateAdmissionStatus(a.id, "rejected")}>Reject</Button>
                            </>
                          )}
                          {a.status === "approved" && (
                            <Button size="sm" className="bg-primary hover:bg-saffron-dark text-primary-foreground" onClick={() => updateAdmissionStatus(a.id, "enrolled")}>Enroll</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Students */}
        {tab === "students" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Student Management</h2>
            
            {/* Add Student Form */}
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Plus className="h-4 w-4" /> Add New Student</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={addStudent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={studentForm.full_name} onChange={(e) => setStudentForm({ ...studentForm, full_name: e.target.value })} required placeholder="Student name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Input value={studentForm.class} onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })} required placeholder="e.g. 5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <Input value={studentForm.section} onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })} placeholder="A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Name</Label>
                    <Input value={studentForm.parent_name} onChange={(e) => setStudentForm({ ...studentForm, parent_name: e.target.value })} placeholder="Parent name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Phone</Label>
                    <Input value={studentForm.parent_phone} onChange={(e) => setStudentForm({ ...studentForm, parent_phone: e.target.value })} placeholder="+91..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Email</Label>
                    <Input type="email" value={studentForm.parent_email} onChange={(e) => setStudentForm({ ...studentForm, parent_email: e.target.value })} placeholder="email" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <Button type="submit" className="bg-primary hover:bg-saffron-dark text-primary-foreground">
                      <Plus className="h-4 w-4 mr-1" /> Add Student
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Student List */}
            <div className="space-y-2">
              {students.map((s) => (
                <Card key={s.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">{s.full_name}</p>
                      <p className="text-xs text-muted-foreground">Class {s.class} {s.section} • {s.parent_name || "No parent"} • {s.parent_phone || ""}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Fees */}
        {tab === "fees" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Fee Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Collected</p>
                  <p className="font-display text-2xl font-extrabold text-green-600">₹{totalFeeCollected.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Pending</p>
                  <p className="font-display text-2xl font-extrabold text-yellow-600">₹{totalFeePending.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Records</p>
                  <p className="font-display text-2xl font-extrabold text-foreground">{fees.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Fee Structure */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Fee Structure</CardTitle></CardHeader>
              <CardContent>
                {feeStructures.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No fee structures configured yet. Add them via the database.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {feeStructures.map((fs) => (
                      <div key={fs.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">Class {fs.class} — {fs.fee_type}</p>
                          <p className="text-xs text-muted-foreground">{fs.academic_year} {fs.description ? `• ${fs.description}` : ""}</p>
                        </div>
                        <p className="font-display font-bold text-foreground">₹{Number(fs.amount).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Records */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Payment Records</CardTitle></CardHeader>
              <CardContent>
                {fees.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No payment records yet.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {fees.map((f) => (
                      <div key={f.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-foreground">₹{Number(f.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Due: {new Date(f.due_date).toLocaleDateString()} {f.receipt_number ? `• Receipt: ${f.receipt_number}` : ""}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          f.status === "paid" ? "bg-green-100 text-green-700" :
                          f.status === "overdue" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>{f.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Announcements */}
        {tab === "announcements" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Announcements</h2>
            
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Plus className="h-4 w-4" /> New Announcement</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={addAnnouncement} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} required placeholder="Announcement title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea value={announcementForm.content} onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })} required placeholder="Announcement content..." rows={4} />
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-saffron-dark text-primary-foreground">
                    <Bell className="h-4 w-4 mr-1" /> Publish
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {announcements.map((a) => (
                <Card key={a.id}>
                  <CardContent className="p-4 flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground">{a.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                      <p className="text-xs text-primary mt-2">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteAnnouncement(a.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
