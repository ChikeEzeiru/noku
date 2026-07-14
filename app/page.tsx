"use client";

import { useState } from "react";
import HomeScreen from "@/components/home/HomeScreen";
import PaymentReview from "@/components/payment/PaymentReview";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import Receipt from "@/components/payment/Receipt";
import FundScreen from "@/components/fund/FundScreen";
import FundExpenditureScreen from "@/components/fund/FundExpenditureScreen";
import NotificationsScreen from "@/components/notifications/NotificationsScreen";
import PaymentsScreen from "@/components/payments/PaymentsScreen";
import UpdatesScreen from "@/components/updates/UpdatesScreen";
import UpdateDetail from "@/components/updates/UpdateDetail";
import ProfileScreen from "@/components/profile/ProfileScreen";
import AddPaymentMethod from "@/components/payment/AddPaymentMethod";
import AddCard from "@/components/payment/AddCard";
import ReportIssue1 from "@/components/report/ReportIssue1";
import ReportIssue2 from "@/components/report/ReportIssue2";
import ReportIssue3 from "@/components/report/ReportIssue3";
import IssuesScreen from "@/components/report/IssuesScreen";
import IssueDetailScreen from "@/components/report/IssueDetailScreen";
import ResidentDetails from "@/components/profile/ResidentDetails";
import BillingScreen from "@/components/profile/BillingScreen";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import BankTransfer from "@/components/payment/BankTransfer";
import { NavTab } from "@/components/shared/BottomNav";
import HomeIndicator from "@/components/shared/HomeIndicator";
import StatusBar from "@/components/shared/StatusBar";
import SplashScreen from "@/components/auth/SplashScreen";
import StartScreen from "@/components/auth/StartScreen";
import InviteCodeScreen from "@/components/auth/InviteCodeScreen";
import ConfirmUnitScreen from "@/components/auth/ConfirmUnitScreen";
import CreateAccountScreen from "@/components/auth/CreateAccountScreen";
import SetupHouseholdScreen from "@/components/auth/SetupHouseholdScreen";
import RegistrationConfirmation from "@/components/auth/RegistrationConfirmation";
import type { PaymentRecord } from "@/types/payment";
import type { UpdateItem } from "@/types/update";
import type { Issue } from "@/lib/issues-data";

type AppState =
  | "splash"
  | "start"
  | "auth-invite"
  | "auth-confirm-unit"
  | "auth-create-account"
  | "auth-setup-household"
  | "auth-confirmation"
  | "home-unpaid"
  | "payment-review"
  | "payment-processing"
  | "payment-success"
  | "home-paid"
  | "receipt"
  | "fund"
  | "payments"
  | "updates"
  | "profile"
  | "add-payment-method"
  | "add-card"
  | "payments-history"
  | "update-detail"
  | "report-issue-1"
  | "report-issue-2"
  | "report-issue-3"
  | "resident-details"
  | "notification-preferences"
  | "billing"
  | "bank-transfer"
  | "issues"
  | "fund-expenditure"
  | "notifications"
  | "issue-detail";

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="white"
      strokeWidth="2"
    >
      <circle cx="10" cy="10" r="8" strokeOpacity="0.25" />
      <path d="M10 2a8 8 0 0 1 8 8" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppState>("splash");
  const [hasPaid, setHasPaid] = useState(false);

  // Auth state
  const [authName, setAuthName] = useState("Ciroma Chukwuma Adekunle");
  const [authOccupants, setAuthOccupants] = useState(5);
  const [authApartmentType, setAuthApartmentType] = useState("3 bedroom flat");
  const [addMethodReturn, setAddMethodReturn] = useState<AppState>("payments");
  const [paymentReviewReturn, setPaymentReviewReturn] = useState<AppState>("home-unpaid");

  function openPaymentReview(returnTo: AppState) {
    setPaymentReviewReturn(returnTo);
    setScreen("payment-review");
  }
  const [receiptReturn, setReceiptReturn] = useState<AppState>("payment-success");
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueDetailReturn, setIssueDetailReturn] = useState<AppState>("issues");

  function openIssueDetail(issue: Issue, returnTo: AppState) {
    setSelectedIssue(issue);
    setIssueDetailReturn(returnTo);
    setScreen("issue-detail");
  }
  const [reportReturn, setReportReturn] = useState<AppState>("home-unpaid");
  const [issueCategory, setIssueCategory] = useState("");
  const [issueSubject, setIssueSubject] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [showIssueToast, setShowIssueToast] = useState(false);

  function openReportIssue(returnTo: AppState) {
    setReportReturn(returnTo);
    setIssueCategory("");
    setIssueSubject("");
    setIssueDescription("");
    setScreen("report-issue-1");
  }

  function handleSubmitIssue() {
    const dest: AppState = reportReturn === "issues" ? "issues" : hasPaid ? "home-paid" : "home-unpaid";
    setScreen(dest);
    setShowIssueToast(true);
    setTimeout(() => setShowIssueToast(false), 4000);
  }
  const [receiptPayment, setReceiptPayment] = useState<PaymentRecord | null>(null);

  function openAddPaymentMethod(returnTo: AppState) {
    setAddMethodReturn(returnTo);
    setScreen("add-payment-method");
  }

  function openReceipt(returnTo: AppState, payment?: PaymentRecord) {
    setReceiptReturn(returnTo);
    setReceiptPayment(payment ?? null);
    setScreen("receipt");
  }

  function handlePay() {
    setScreen("payment-processing");
    setTimeout(() => {
      setHasPaid(true);
      setScreen("payment-success");
    }, 2000);
  }

  function handleNavigate(tab: NavTab) {
    switch (tab) {
      case "home":
        setScreen(hasPaid ? "home-paid" : "home-unpaid");
        break;
      case "fund":
        setScreen("fund");
        break;
      case "payments":
        setScreen("payments");
        break;
      case "updates":
        setScreen("updates");
        break;
      case "profile":
        setScreen("profile");
        break;
    }
  }

  const homeIsPaid = hasPaid || screen === "home-paid";

  return (
    <div className="min-h-screen flex justify-center bg-noku-card">
      <div className="w-full max-w-app bg-noku-bg min-h-screen relative overflow-hidden pt-11">
        {screen === "splash" && (
          <SplashScreen onDone={() => setScreen("start")} />
        )}

        {screen === "start" && (
          <StartScreen onRegister={() => setScreen("auth-invite")} />
        )}

        {screen === "auth-invite" && (
          <InviteCodeScreen onNext={() => setScreen("auth-confirm-unit")} />
        )}

        {screen === "auth-confirm-unit" && (
          <ConfirmUnitScreen
            onConfirm={() => setScreen("auth-create-account")}
            onNotRight={() => setScreen("auth-invite")}
          />
        )}

        {screen === "auth-create-account" && (
          <CreateAccountScreen
            onNext={(name) => { setAuthName(name); setScreen("auth-setup-household"); }}
            onBack={() => setScreen("auth-confirm-unit")}
          />
        )}

        {screen === "auth-setup-household" && (
          <SetupHouseholdScreen
            onComplete={(occupants, apartmentType) => {
              setAuthOccupants(occupants);
              setAuthApartmentType(apartmentType);
              setScreen("auth-confirmation");
            }}
            onBack={() => setScreen("auth-create-account")}
          />
        )}

        {screen === "auth-confirmation" && (
          <RegistrationConfirmation
            name={authName}
            occupants={authOccupants}
            apartmentType={authApartmentType}
            onContinue={() => setScreen("home-unpaid")}
          />
        )}

        {(screen === "home-unpaid" || screen === "home-paid") && (
          <HomeScreen
            isPaid={homeIsPaid}
            onPayNow={() => openPaymentReview(homeIsPaid ? "home-paid" : "home-unpaid")}
            onViewReceipt={() => openReceipt(homeIsPaid ? "home-paid" : "home-unpaid")}
            onViewPaymentReceipt={(payment) => openReceipt(homeIsPaid ? "home-paid" : "home-unpaid", payment)}
            onNavigate={handleNavigate}
            onSeeAll={() => setScreen("payments-history")}
            onReportIssue={() => openReportIssue(homeIsPaid ? "home-paid" : "home-unpaid")}
            onNotifications={() => setScreen("notifications")}
            onMyUnit={() => setScreen("resident-details")}
          />
        )}

        {screen === "payment-review" && (
          <PaymentReview
            onPay={handlePay}
            onBack={() => setScreen(paymentReviewReturn)}
            onAddPaymentMethod={() => openAddPaymentMethod("payment-review")}
          />
        )}

        {screen === "payment-processing" && (
          <div className="bg-noku-bg min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col gap-6 pt-6 pb-6">
              <div className="px-6">
                <div className="border border-noku-border-light rounded-lg p-1.5 flex items-center gap-2 text-noku-text-mid w-fit opacity-50">
                  <span className="text-xs">Back</span>
                </div>
              </div>

              <div className="px-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
                    Billing Details
                  </p>
                  <span className="text-[10px] font-medium text-noku-overdue-text bg-noku-overdue-bg border border-noku-overdue-border rounded-md px-1.5 py-0.5">
                    Overdue
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2 p-2">
                    <p className="text-sm text-noku-text-dim min-w-[124px]">Billing Period:</p>
                    <p className="text-sm font-medium text-noku-text-mid">June 2026</p>
                  </div>
                  <div className="px-2">
                    <p className="text-xl font-semibold text-noku-heading">₦95,000</p>
                  </div>
                  <div className="bg-noku-warm-hover border border-noku-border-light rounded-lg p-3 flex flex-col gap-1 mt-1">
                    <div className="flex items-center justify-between p-1">
                      <p className="text-sm text-noku-text-dim">Base amount:</p>
                      <p className="text-sm font-medium text-noku-text-mid">₦95,000</p>
                    </div>
                    <div className="flex items-center justify-between p-1 opacity-50">
                      <p className="text-sm text-noku-text-dim">Credit/shortfall from prev mth:</p>
                      <p className="text-sm font-medium text-noku-text-mid">₦0</p>
                    </div>
                    <div className="flex items-center justify-between p-1">
                      <p className="text-sm text-noku-text-dim">Final amount charged</p>
                      <p className="text-sm font-medium text-noku-text-mid">₦95,000</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2">
                  <p className="text-sm text-noku-text-dim min-w-[124px]">Apartment details:</p>
                  <p className="text-sm font-medium text-noku-text-mid">5 occupants · 3 bed · 4 ACs</p>
                </div>
                <div className="border-t border-noku-border-light" />
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-medium text-noku-text-dim uppercase tracking-[0.06em]">
                    Payment Method
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-10 flex flex-col gap-4">
              <button
                disabled
                className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 opacity-90"
              >
                <Spinner />
                Processing…
              </button>
              <div className="h-[40px]" />
            </div>
          </div>
        )}

        {screen === "payment-success" && (
          <PaymentSuccess
            onBackToHome={() => setScreen("home-paid")}
            onViewReceipt={() => openReceipt("payment-success")}
          />
        )}

        {screen === "receipt" && (
          <Receipt onBack={() => setScreen(receiptReturn)} payment={receiptPayment} />
        )}

        {screen === "notifications" && (
          <NotificationsScreen onBack={() => setScreen(hasPaid ? "home-paid" : "home-unpaid")} />
        )}

        {screen === "fund" && (
          <FundScreen onNavigate={handleNavigate} onSeeAll={() => setScreen("fund-expenditure")} />
        )}

        {screen === "fund-expenditure" && (
          <FundExpenditureScreen onBack={() => setScreen("fund")} />
        )}

        {screen === "payments" && (
          <PaymentsScreen
            isPaid={hasPaid}
            onPayNow={() => openPaymentReview("payments")}
            onNavigate={handleNavigate}
            onAddPaymentMethod={() => openAddPaymentMethod("payments")}
            onViewPaymentReceipt={(payment) => openReceipt("payments", payment)}
            onSeeAll={() => setScreen("payments-history")}
          />
        )}

        {screen === "payments-history" && (
          <PaymentsScreen
            isPaid={hasPaid}
            historyOnly
            onPayNow={() => openPaymentReview("payments")}
            onNavigate={handleNavigate}
            onAddPaymentMethod={() => openAddPaymentMethod("payments")}
            onViewPaymentReceipt={(payment) => openReceipt("payments-history", payment)}
            onBack={() => setScreen("payments")}
          />
        )}

        {screen === "updates" && (
          <UpdatesScreen
            onNavigate={handleNavigate}
            onSelectCard={(update) => { setSelectedUpdate(update); setScreen("update-detail"); }}
          />
        )}

        {screen === "update-detail" && selectedUpdate && (
          <UpdateDetail
            update={selectedUpdate}
            onBack={() => setScreen("updates")}
          />
        )}

        {screen === "profile" && (
          <ProfileScreen
            onNavigate={handleNavigate}
            onBilling={() => setScreen("billing")}
            onReportIssue={() => setScreen("issues")}
            onResidentDetails={() => setScreen("resident-details")}
            onNotificationPreferences={() => setScreen("notification-preferences")}
            onLogout={() => { setHasPaid(false); setScreen("start"); }}
          />
        )}

        {screen === "issues" && (
          <IssuesScreen
            onBack={() => setScreen("profile")}
            onReportIssue={() => openReportIssue("issues")}
            onSelectIssue={(issue) => openIssueDetail(issue, "issues")}
          />
        )}

        {screen === "issue-detail" && selectedIssue && (
          <IssueDetailScreen
            issue={selectedIssue}
            onBack={() => setScreen(issueDetailReturn)}
          />
        )}

        {screen === "add-payment-method" && (
          <AddPaymentMethod
            onBack={() => setScreen(addMethodReturn)}
            onAddCard={() => setScreen("add-card")}
            onBankTransfer={() => setScreen("bank-transfer")}
            onConfirm={() => setScreen(addMethodReturn)}
          />
        )}

        {screen === "add-card" && (
          <AddCard
            onBack={() => setScreen("add-payment-method")}
            onConfirm={() => setScreen(addMethodReturn)}
          />
        )}

        {screen === "report-issue-1" && (
          <ReportIssue1
            selected={issueCategory}
            onSelect={setIssueCategory}
            onNext={() => setScreen("report-issue-2")}
            onBack={() => setScreen(reportReturn)}
          />
        )}

        {screen === "report-issue-2" && (
          <ReportIssue2
            category={issueCategory}
            subject={issueSubject}
            description={issueDescription}
            onSubjectChange={setIssueSubject}
            onDescriptionChange={setIssueDescription}
            onNext={() => setScreen("report-issue-3")}
            onBack={() => setScreen("report-issue-1")}
            onChangeCategory={() => setScreen("report-issue-1")}
          />
        )}

        {screen === "report-issue-3" && (
          <ReportIssue3
            category={issueCategory}
            subject={issueSubject}
            description={issueDescription}
            onEdit={() => setScreen("report-issue-2")}
            onChangeCategory={() => setScreen("report-issue-1")}
            onSubmit={handleSubmitIssue}
            onBack={() => setScreen("report-issue-2")}
          />
        )}

        {screen === "resident-details" && (
          <ResidentDetails
            onBack={() => setScreen("profile")}
            onIssues={() => setScreen("issues")}
            onIssueDetail={(issue) => openIssueDetail(issue, "resident-details")}
          />
        )}

        {screen === "notification-preferences" && (
          <NotificationPreferences onBack={() => setScreen("profile")} />
        )}

        {screen === "billing" && (
          <BillingScreen onBack={() => setScreen("profile")} />
        )}

        {screen === "bank-transfer" && (
          <BankTransfer
            onBack={() => setScreen("add-payment-method")}
            onConfirm={() => setScreen(addMethodReturn)}
          />
        )}

        <StatusBar />
        <HomeIndicator />

        {/* Issue reported toast */}
        {showIssueToast && (
          <div className="absolute top-4 left-4 right-4 z-50 animate-[fadeSlideIn_0.25s_ease-out]">
            <div
              className="bg-white border border-noku-border-primary rounded-xl p-4 flex flex-col gap-1.5"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-noku-text-mid">Issue reported</p>
                <button
                  onClick={() => setShowIssueToast(false)}
                  className="text-noku-text-dim p-0.5"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 5 5 15M5 5l10 10"/>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-noku-text-dim leading-5">
                The issue has been reported to the committee and will be addressed soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
