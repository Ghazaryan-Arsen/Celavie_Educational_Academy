import React, { useState } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { isSupabaseConfigured } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import type { NiceExchangeApplicationRow, NiceExchangeApplicationStatus } from '../types/niceExchange';
import { CheckCircle, XCircle, Lock, LogOut } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'enrollments' | 'nice_exchange'>('enrollments');

  const [niceApps, setNiceApps] = useState<NiceExchangeApplicationRow[]>([]);
  const [niceLoading, setNiceLoading] = useState(false);
  const [niceError, setNiceError] = useState('');
  const [mockEnrollments] = useState([
    { id: 'en-1', name: 'Marie Curie', email: 'marie@example.com', course: 'French Language Mastery', payment: 'Card', status: 'completed', date: '2025-01-15' },
    { id: 'en-2', name: 'John Doe', email: 'john@example.com', course: 'SMM Pro: Growth & Paid Advertising', payment: 'Bank Transfer', status: 'pending', date: '2025-01-16' },
  ]);

  const loadNiceApps = async () => {
    if (!supabase) return;

    setNiceLoading(true);
    setNiceError('');
    const { data, error } = await supabase
      .from('nice_exchange_applications')
      .select('id, first_name, last_name, age, school, email, phone, country, language_level, motivation_essay, parent_name, parent_phone, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Nice Exchange applications could not be loaded', error);
      setNiceError('Applications could not be loaded. Please try again.');
    } else {
      setNiceApps((data || []) as NiceExchangeApplicationRow[]);
    }
    setNiceLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setLoginError('The admin database is not configured.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: username.trim(), password });
    if (!error) {
      setIsAuthenticated(true);
      setLoginError('');
      void loadNiceApps();
    } else {
      console.error('Admin sign-in failed', error);
      setLoginError('Invalid admin credentials.');
    }
  };

  const toggleNiceAppStatus = async (id: string, newStatus: NiceExchangeApplicationStatus) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('nice_exchange_applications')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Nice Exchange application status update failed', error);
      setNiceError('Application status could not be updated. Please try again.');
      return;
    }

    setNiceApps((applications) => applications.map((application) => (
      application.id === id ? { ...application, status: newStatus } : application
    )));
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAuthenticated(false);
    setNiceApps([]);
  };

  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb items={[{ label: 'Admin Dashboard' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-left">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-sm">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-black">Admin Authentication</h2>
                <p className="text-xs text-gray-500">Sign in to manage enrollments and applications</p>
              </div>

              {!isSupabaseConfigured && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 mb-4">
                  Supabase credentials are not set. Admin access is unavailable.
                </div>
              )}

              {loginError && (
                <p className="text-xs text-red-600 font-medium mb-4 bg-red-50 p-2.5 rounded border border-red-200">
                  {loginError}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  id="username"
                  label="Admin Email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@example.com"
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                />
                <Button variant="primary" className="w-full font-bold">
                  Log In to Dashboard
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-black">CELAVIE Admin Management</h1>
                  <p className="text-xs text-gray-500">Overview of student registrations and exchange applications</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => void handleLogout()}>
                  <LogOut className="w-4 h-4 mr-1.5" /> Log Out
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-2 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('enrollments')}
                  className={`py-2 px-4 text-sm font-semibold border-b-2 transition ${
                    activeTab === 'enrollments'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  Student Enrollments ({mockEnrollments.length})
                </button>
                <button
                  onClick={() => setActiveTab('nice_exchange')}
                  className={`py-2 px-4 text-sm font-semibold border-b-2 transition ${
                    activeTab === 'nice_exchange'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  Nice Exchange Queue ({niceApps.length})
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'enrollments' && (
                <div className="bg-white rounded border border-gray-200 overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
                      <tr>
                        <th className="p-3">Student</th>
                        <th className="p-3">Course</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {mockEnrollments.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-3 font-semibold text-black">{item.name}<br/><span className="text-xs font-normal text-gray-500">{item.email}</span></td>
                          <td className="p-3 text-gray-700">{item.course}</td>
                          <td className="p-3 text-gray-600">{item.payment}</td>
                          <td className="p-3">
                            <Badge variant={item.status === 'completed' ? 'success' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-gray-500">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'nice_exchange' && (
                <div className="bg-white rounded border border-gray-200 overflow-x-auto">
                  {niceError && <p className="p-3 text-xs text-red-700 bg-red-50 border-b border-red-200">{niceError}</p>}
                  {niceLoading && <p className="p-3 text-xs text-gray-500">Loading applications...</p>}
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
                      <tr>
                        <th className="p-3">Applicant</th>
                        <th className="p-3">Age</th>
                        <th className="p-3">School</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Level</th>
                        <th className="p-3">Parent</th>
                        <th className="p-3">Motivation Essay</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {niceApps.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="p-3 font-semibold text-black">{item.first_name} {item.last_name}<br/><span className="text-xs font-normal text-gray-500">{item.email}</span></td>
                          <td className="p-3 text-gray-700">{item.age}</td>
                          <td className="p-3 text-gray-700">{item.school}</td>
                          <td className="p-3 text-gray-600">{item.phone}<br />{item.country}</td>
                          <td className="p-3 text-gray-600">{item.language_level}</td>
                          <td className="p-3 text-gray-600">{item.parent_name || 'Not provided'}<br />{item.parent_phone}</td>
                          <td className="p-3 text-gray-600 min-w-[20rem]">{item.motivation_essay}</td>
                          <td className="p-3">
                            <Badge variant={item.status === 'approved' ? 'success' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                          <td className="p-3 flex space-x-1">
                            <button
                              onClick={() => toggleNiceAppStatus(item.id, 'approved')}
                              className="p-1 text-green-700 hover:bg-green-50 rounded"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleNiceAppStatus(item.id, 'rejected')}
                              className="p-1 text-red-700 hover:bg-red-50 rounded"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};
