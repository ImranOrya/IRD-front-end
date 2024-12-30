import { BrowserRouter, Route, Routes } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import ProfilePage from "@/views/pages/auth/general/profile/profile-page";
import LogsPage from "@/views/pages/auth/super/logs/logs-page";
import ErrorPage from "@/views/pages/error/error-page";
import SuperDashboardPage from "@/views/pages/auth/general/dashboard/super-dashboard-page";
import LoginPage from "@/views/pages/guest/login-page";
import ForgotPasswordPage from "@/views/pages/guest/password/forgot-password-page";
import MainPage from "@/views/site/main-page";
import HomePage from "@/views/site/tabs/home/home-page";
import AboutPage from "@/views/site/tabs/about/about-page";
import ContactPage from "@/views/site/tabs/contact/contact-page";
import SiteLayout from "@/views/layout/site-layout";
import SuperAuditPage from "@/views/pages/auth/super/audit/super-audit-page";
import SuperUserEditPage from "@/views/pages/auth/general/users/edit/super-user-edit-page";
import { User, UserPermission } from "@/database/tables";
import ProtectedRoute from "@/routes/protected-route";
import Unauthorized from "@/views/pages/error/unauthorized";
import GuestLayout from "@/views/layout/guest-layout";
import AuthLayout from "@/views/layout/auth-layout";
import UserSettingsPage from "@/views/pages/auth/user/settings/user-settings-page";
import UserDashboardPage from "@/views/pages/auth/user/dashboard/user-dashboard-page";
import DonorDashboardPage from "@/views/pages/auth/donor/dashboard/donor-dashboard-page";
import DonorNgoPage from "@/views/pages/auth/donor/ngo/donor-ngo-page";
import DonorProjectsPage from "@/views/pages/auth/donor/projects/donor-projects-page";
import DonorReportsPage from "@/views/pages/auth/donor/reports/donor-reports-page";
import DonorSettingsPage from "@/views/pages/auth/donor/settings/donor-settings-page";
import NgoDashboardPage from "@/views/pages/auth/ngo/dashboard/ngo-dashboard-page";
import NgoProjectsPage from "@/views/pages/auth/ngo/projects/ngo-projects-page";
import NgoSettingsPage from "@/views/pages/auth/ngo/settings/ngo-settings-page";
import UserNgoPage from "@/views/pages/auth/user/ngo/user-ngo-page";
import UserReportsPage from "@/views/pages/auth/user/reports/user-reports-page";
import SuperSettingsPage from "@/views/pages/auth/general/settings/super-settings-page";
import SuperReportsPage from "@/views/pages/auth/general/reports/super-reports-page";
import SuperUserPage from "@/views/pages/auth/general/users/super-user-page";
import NgoReportsPage from "@/views/pages/auth/ngo/reports/ngo-reports-page";
import ProjectsPage from "@/views/pages/auth/user/projects/projects-page";

export const getSuperRouter = (user: User) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* Super Routes (Protected) */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <AuthLayout />
            </I18nextProvider>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<SuperDashboardPage />}
                routeName="dashboard"
                permissions={permissions}
              />
            }
          />
          <Route
            path="ngo"
            element={
              <ProtectedRoute
                element={<UserNgoPage />}
                routeName="ngo"
                permissions={permissions}
              />
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute
                element={<ProjectsPage />}
                routeName="projects"
                permissions={permissions}
              />
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute
                element={<SuperUserPage />}
                routeName="users"
                permissions={permissions}
              />
            }
          />
          <Route
            path="users/:id"
            element={
              <ProtectedRoute
                element={<SuperUserEditPage />}
                routeName="users"
                permissions={permissions}
              />
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute
                element={<SuperReportsPage />}
                routeName="ngo-reports"
                permissions={permissions}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute
                element={<SuperSettingsPage />}
                routeName="settings"
                permissions={permissions}
              />
            }
          />
          <Route
            path="audit"
            element={
              <ProtectedRoute
                element={<SuperAuditPage />}
                routeName="audit"
                permissions={permissions}
              />
            }
          />
          <Route
            path="logs"
            element={
              <ProtectedRoute
                element={<LogsPage />}
                routeName="logs"
                permissions={permissions}
              />
            }
          />
        </Route>

        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export const getAdminRouter = (user: User) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* Super Routes (Protected) */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <AuthLayout />
            </I18nextProvider>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<SuperDashboardPage />}
                routeName="dashboard"
                permissions={permissions}
              />
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute
                element={<SuperUserPage />}
                routeName="users"
                permissions={permissions}
              />
            }
          />
          <Route
            path="users/:id"
            element={
              <ProtectedRoute
                element={<SuperUserEditPage />}
                routeName="users"
                permissions={permissions}
              />
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute
                element={<SuperReportsPage />}
                routeName="reports"
                permissions={permissions}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute
                element={<SuperSettingsPage />}
                routeName="settings"
                permissions={permissions}
              />
            }
          />
        </Route>

        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export const getUserRouter = (user: User) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* User Routes (Protected) */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <AuthLayout />
            </I18nextProvider>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<UserDashboardPage />}
                routeName="dashboard"
                permissions={permissions}
              />
            }
          />
          <Route
            path="ngo"
            element={
              <ProtectedRoute
                element={<UserNgoPage />}
                routeName="ngo"
                permissions={permissions}
              />
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute
                element={<ProjectsPage />}
                routeName="projects"
                permissions={permissions}
              />
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute
                element={<UserReportsPage />}
                routeName="reports"
                permissions={permissions}
              />
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute
                element={<UserSettingsPage />}
                routeName="settings"
                permissions={permissions}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export const getNgoRouter = (user: User) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* User Routes (Protected) */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <AuthLayout />
            </I18nextProvider>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<NgoDashboardPage />}
                routeName="dashboard"
                permissions={permissions}
              />
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute
                element={<NgoProjectsPage />}
                routeName="projects"
                permissions={permissions}
              />
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute
                element={<NgoReportsPage />}
                routeName="reports"
                permissions={permissions}
              />
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute
                element={<NgoSettingsPage />}
                routeName="settings"
                permissions={permissions}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export const getDonorRouter = (user: User) => {
  const permissions: Map<string, UserPermission> = user.permissions;
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>

        {/* User Routes (Protected) */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <AuthLayout />
            </I18nextProvider>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<DonorDashboardPage />}
                routeName="dashboard"
                permissions={permissions}
              />
            }
          />
          <Route
            path="ngo"
            element={
              <ProtectedRoute
                element={<DonorNgoPage />}
                routeName="ngo"
                permissions={permissions}
              />
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute
                element={<DonorProjectsPage />}
                routeName="projects"
                permissions={permissions}
              />
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute
                element={<DonorReportsPage />}
                routeName="reports"
                permissions={permissions}
              />
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute
                element={<DonorSettingsPage />}
                routeName="settings"
                permissions={permissions}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export const getGuestRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <GuestLayout />
            </I18nextProvider>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donor/login" element={<LoginPage />} />
          <Route path="/ngo/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
        </Route>
        {/* Site Routes */}
        <Route
          path="/"
          element={
            <I18nextProvider i18n={i18n}>
              <SiteLayout />
            </I18nextProvider>
          }
        >
          {/* These routes will be passed as children */}
          {site}
        </Route>
        {/* Catch-all Route for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const site = (
  <Route path="/" element={<MainPage />}>
    <Route index element={<HomePage />} />
    {/* Default route (equivalent to `/`) */}
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="*" element={<HomePage />} />
    {/* Fallback for unknown routes */}
  </Route>
);
