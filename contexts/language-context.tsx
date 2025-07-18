"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "hi" | "mr"

interface Translations {
  // Common
  selectLoginType: string
  passengerLogin: string
  adminLogin: string
  currentTime: string
  login: string
  logout: string
  dashboard: string

  // Registration
  tokenRegistration: string
  selfRegistration: string
  representativeRegistration: string
  registrationOpen: string
  registrationClosed: string
  registrationWindow: string

  // Form fields
  mobileNumber: string
  aadhaarNumber: string
  enterOTP: string
  sendOTP: string
  verifyOTP: string
  selectClass: string
  numberOfPassengers: string
  username: string
  password: string

  // Token related
  tokenNumber: string
  tokenRegistered: string
  tokenWillBeGenerated: string
  tokenGenerationNote: string
  tokenListWillBeGenerated: string
  tokenList: string
  tokenListGenerated: string
  generateFinalList: string
  viewTokenList: string
  downloadConfirmation: string
  backToDashboard: string
  registerToken: string

  // Classes and types
  class: string
  passengers: string
  type: string
  self: string
  representative: string
  tokens: string
  totalTokens: string

  // Admin specific
  adminDashboard: string
  registrationControl: string
  openRegistration: string
  closeRegistration: string
  manualTokenIssue: string
  issueManualToken: string
  tokenListGeneration: string
  listGenerated: string
  liveMonitoring: string
  reports: string
  quickActions: string

  // Representative flow
  passengerDetails: string
  representativeDetails: string
  passengerAadhaar: string
  representativeAadhaar: string
  passengerOTP: string
  representativeOTP: string

  // Search and filters
  searchTokens: string
  noTokensFound: string

  // New keys
  registrationSuccessful: string
  keepConfirmationSafe: string
  superAdmin: string
  stationAdmin: string
  clerk: string
  adminRole: string

  // New keys
  passengerName: string
  representativeName: string
  name: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Common
    selectLoginType: "Select Login Type",
    passengerLogin: "Passenger Login",
    adminLogin: "Admin Login",
    currentTime: "Current Time",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",

    // Registration
    tokenRegistration: "Token Registration",
    selfRegistration: "Self Registration",
    representativeRegistration: "Representative Registration",
    registrationOpen: "Registration Open",
    registrationClosed: "Registration Closed",
    registrationWindow: "Registration Window",

    // Form fields
    mobileNumber: "Mobile Number",
    aadhaarNumber: "Aadhaar Number",
    enterOTP: "Enter OTP",
    sendOTP: "Send OTP",
    verifyOTP: "Verify OTP",
    selectClass: "Select Class",
    numberOfPassengers: "Number of Passengers",
    username: "Username",
    password: "Password",

    // Token related
    tokenNumber: "Token Number",
    tokenRegistered: "Token Registered Successfully!",
    tokenWillBeGenerated: "Token will be generated at 9:15 AM",
    tokenGenerationNote: "Token will be generated at 9:15 AM. Please keep this confirmation safe.",
    tokenListWillBeGenerated: "Token list will be generated at 9:15 AM",
    tokenList: "Token List",
    tokenListGenerated: "Token List Generated",
    generateFinalList: "Generate Final List",
    viewTokenList: "View Token List",
    downloadConfirmation: "Download Confirmation",
    backToDashboard: "Back to Dashboard",
    registerToken: "Register Token",

    // Classes and types
    class: "Class",
    passengers: "Passengers",
    type: "Type",
    self: "Self",
    representative: "Representative",
    tokens: "Tokens",
    totalTokens: "Total Tokens",

    // Admin specific
    adminDashboard: "Admin Dashboard",
    registrationControl: "Registration Control",
    openRegistration: "Open Registration",
    closeRegistration: "Close Registration",
    manualTokenIssue: "Manual Token Issue",
    issueManualToken: "Issue Manual Token",
    tokenListGeneration: "Token List Generation",
    listGenerated: "List Generated",
    liveMonitoring: "Live Monitoring",
    reports: "Reports",
    quickActions: "Quick Actions",

    // Representative flow
    passengerDetails: "Passenger Details",
    representativeDetails: "Representative Details",
    passengerAadhaar: "Passenger's Aadhaar",
    representativeAadhaar: "Representative's Aadhaar",
    passengerOTP: "Passenger's OTP",
    representativeOTP: "Representative's OTP",

    // Search and filters
    searchTokens: "Search tokens...",
    noTokensFound: "No tokens found",

    // New translations
    registrationSuccessful: "Registration Successful!",
    keepConfirmationSafe: "Please keep this confirmation safe until token generation.",
    superAdmin: "Super Admin",
    stationAdmin: "Station Admin",
    clerk: "Clerk",
    adminRole: "Admin Role",

    // New translations
    passengerName: "Passenger Name",
    representativeName: "Representative Name",
    name: "Name",
  },
  hi: {
    // Common
    selectLoginType: "लॉगिन प्रकार चुनें",
    passengerLogin: "यात्री लॉगिन",
    adminLogin: "एडमिन लॉगिन",
    currentTime: "वर्तमान समय",
    login: "लॉगिन",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",

    // Registration
    tokenRegistration: "टोकन पंजीकरण",
    selfRegistration: "स्वयं पंजीकरण",
    representativeRegistration: "प्रतिनिधि पंजीकरण",
    registrationOpen: "पंजीकरण खुला",
    registrationClosed: "पंजीकरण बंद",
    registrationWindow: "पंजीकरण विंडो",

    // Form fields
    mobileNumber: "मोबाइल नंबर",
    aadhaarNumber: "आधार नंबर",
    enterOTP: "OTP दर्ज करें",
    sendOTP: "OTP भेजें",
    verifyOTP: "OTP सत्यापित करें",
    selectClass: "श्रेणी चुनें",
    numberOfPassengers: "यात्रियों की संख्या",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",

    // Token related
    tokenNumber: "टोकन नंबर",
    tokenRegistered: "टोकन सफलतापूर्वक पंजीकृत!",
    tokenWillBeGenerated: "टोकन सुबह 9:15 बजे जेनरेट होगा",
    tokenGenerationNote: "टोकन सुबह 9:15 बजे जेनरेट होगा। कृपया इस पुष्टि को सुरक्षित रखें।",
    tokenListWillBeGenerated: "टोकन सूची सुबह 9:15 बजे जेनरेट होगी",
    tokenList: "टोकन सूची",
    tokenListGenerated: "टोकन सूची जेनरेट की गई",
    generateFinalList: "अंतिम सूची जेनरेट करें",
    viewTokenList: "टोकन सूची देखें",
    downloadConfirmation: "पुष्टि डाउनलोड करें",
    backToDashboard: "डैशबोर्ड पर वापस",
    registerToken: "टोकन पंजीकृत करें",

    // Classes and types
    class: "श्रेणी",
    passengers: "यात्री",
    type: "प्रकार",
    self: "स्वयं",
    representative: "प्रतिनिधि",
    tokens: "टोकन",
    totalTokens: "कुल टोकन",

    // Admin specific
    adminDashboard: "एडमिन डैशबोर्ड",
    registrationControl: "पंजीकरण नियंत्रण",
    openRegistration: "पंजीकरण खोलें",
    closeRegistration: "पंजीकरण बंद करें",
    manualTokenIssue: "मैन्युअल टोकन जारी करना",
    issueManualToken: "मैन्युअल टोकन जारी करें",
    tokenListGeneration: "टोकन सूची जेनरेशन",
    listGenerated: "सूची जेनरेट की गई",
    liveMonitoring: "लाइव मॉनिटरिंग",
    reports: "रिपोर्ट",
    quickActions: "त्वरित कार्य",

    // Representative flow
    passengerDetails: "यात्री विवरण",
    representativeDetails: "प्रतिनिधि विवरण",
    passengerAadhaar: "यात्री का आधार",
    representativeAadhaar: "प्रतिनिधि का आधार",
    passengerOTP: "यात्री का OTP",
    representativeOTP: "प्रतिनिधि का OTP",

    // Search and filters
    searchTokens: "टोकन खोजें...",
    noTokensFound: "कोई टोकन नहीं मिला",

    // New translations
    registrationSuccessful: "पंजीकरण सफल!",
    keepConfirmationSafe: "कृपया टोकन जेनरेशन तक इस पुष्टि को सुरक्षित रखें।",
    superAdmin: "सुपर एडमिन",
    stationAdmin: "स्टेशन एडमिन",
    clerk: "क्लर्क",
    adminRole: "एडमिन भूमिका",

    // New translations
    passengerName: "यात्री का नाम",
    representativeName: "प्रतिनिधि का नाम",
    name: "नाम",
  },
  mr: {
    // Common
    selectLoginType: "लॉगिन प्रकार निवडा",
    passengerLogin: "प्रवासी लॉगिन",
    adminLogin: "अॅडमिन लॉगिन",
    currentTime: "सध्याची वेळ",
    login: "लॉगिन",
    logout: "लॉगआउट",
    dashboard: "डॅशबोर्ड",

    // Registration
    tokenRegistration: "टोकन नोंदणी",
    selfRegistration: "स्वतः नोंदणी",
    representativeRegistration: "प्रतिनिधी नोंदणी",
    registrationOpen: "नोंदणी उघडी",
    registrationClosed: "नोंदणी बंद",
    registrationWindow: "नोंदणी विंडो",

    // Form fields
    mobileNumber: "मोबाइल नंबर",
    aadhaarNumber: "आधार नंबर",
    enterOTP: "OTP टाका",
    sendOTP: "OTP पाठवा",
    verifyOTP: "OTP सत्यापित करा",
    selectClass: "वर्ग निवडा",
    numberOfPassengers: "प्रवाशांची संख्या",
    username: "वापरकर्ता नाव",
    password: "पासवर्ड",

    // Token related
    tokenNumber: "टोकन नंबर",
    tokenRegistered: "टोकन यशस्वीरित्या नोंदवले!",
    tokenWillBeGenerated: "टोकन सकाळी 9:15 वाजता तयार होईल",
    tokenGenerationNote: "टोकन सकाळी 9:15 वाजता तयार होईल. कृपया ही पुष्टी सुरक्षित ठेवा.",
    tokenListWillBeGenerated: "टोकन यादी सकाळी 9:15 वाजता तयार होईल",
    tokenList: "टोकन यादी",
    tokenListGenerated: "टोकन यादी तयार केली",
    generateFinalList: "अंतिम यादी तयार करा",
    viewTokenList: "टोकन यादी पहा",
    downloadConfirmation: "पुष्टी डाउनलोड करा",
    backToDashboard: "डॅशबोर्डवर परत",
    registerToken: "टोकन नोंदवा",

    // Classes and types
    class: "वर्ग",
    passengers: "प्रवासी",
    type: "प्रकार",
    self: "स्वतः",
    representative: "प्रतिनिधी",
    tokens: "टोकन",
    totalTokens: "एकूण टोकन",

    // Admin specific
    adminDashboard: "अॅडमिन डॅशबोर्ड",
    registrationControl: "नोंदणी नियंत्रण",
    openRegistration: "नोंदणी उघडा",
    closeRegistration: "नोंदणी बंद करा",
    manualTokenIssue: "मॅन्युअल टोकन जारी करणे",
    issueManualToken: "मॅन्युअल टोकन जारी करा",
    tokenListGeneration: "टोकन यादी निर्मिती",
    listGenerated: "यादी तयार केली",
    liveMonitoring: "थेट निरीक्षण",
    reports: "अहवाल",
    quickActions: "त्वरित कृती",

    // Representative flow
    passengerDetails: "प्रवासी तपशील",
    representativeDetails: "प्रतिनिधी तपशील",
    passengerAadhaar: "प्रवाशाचा आधार",
    representativeAadhaar: "प्रतिनिधीचा आधार",
    passengerOTP: "प्रवाशाचा OTP",
    representativeOTP: "प्रतिनिधीचा OTP",

    // Search and filters
    searchTokens: "टोकन शोधा...",
    noTokensFound: "कोणतेही टोकन सापडले नाहीत",

    // New translations
    registrationSuccessful: "नोंदणी यशस्वी!",
    keepConfirmationSafe: "कृपया टोकन जेनरेशन पर्यंत ही पुष्टी सुरक्षित ठेवा।",
    superAdmin: "सुपर अॅडमिन",
    stationAdmin: "स्टेशन अॅडमिन",
    clerk: "लिपिक",
    adminRole: "अॅडमिन भूमिका",

    // New translations
    passengerName: "प्रवाशाचे नाव",
    representativeName: "प्रतिनिधीचे नाव",
    name: "नाव",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
