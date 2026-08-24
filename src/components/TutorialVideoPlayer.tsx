import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipForward,
  SkipBack,
  Sparkles,
  CheckCircle,
  QrCode,
  Receipt,
  ShoppingCart,
  Package,
  Users,
  Database,
  Languages,
  UserCheck,
  Radio,
  Loader2,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/translations';
import {
  fetchHumanSpeechAudio,
  HUMAN_VOICE_PERSONAS,
  HumanVoicePersona,
} from '../utils/humanVoice';

export interface TutorialScene {
  title: string;
  description: string;
  narration: {
    en: string;
    hi: string;
    bn: string;
    as: string;
  };
  indicPhonetic: {
    bn: string;
    as: string;
  };
  icon: any;
  screenType: 'pos' | 'products' | 'customer' | 'backup';
  highlights: string[];
  simulatedData?: any;
}

export interface TutorialGuide {
  id: string;
  title: string;
  category: string;
  durationSec: number;
  description: string;
  scenes: TutorialScene[];
}

export const TUTORIAL_DATA: TutorialGuide[] = [
  {
    id: 'pos-billing',
    title: 'POS Fast Billing & Receipt Printing',
    category: 'Billing & POS',
    durationSec: 45,
    description: 'Learn how to add products to the POS cart, apply discounts, settle split payments, and print GST tax invoices.',
    scenes: [
      {
        title: 'Step 1: Open POS & Search Items',
        description: 'Navigate to Quick Entry / POS tab and search or scan product barcode.',
        narration: {
          en: 'Welcome to Hisab Kitap Point of Sale billing. Open the Quick Entry tab and select items from your catalog or scan barcodes.',
          hi: 'हिसाब किताब पॉइंट ऑफ सेल बिलिंग में आपका स्वागत है। क्विक एंट्री टैब खोलें और अपनी दुकान के उत्पाद चुनें या बारकोड स्कैन करें।',
          bn: 'হিসাব কিতাব পয়েন্ট অব সেল বিলিংয়ে স্বাগতম। কুইক এন্ট্রি ট্যাব খুলুন এবং পণ্য নির্বাচন করুন বা বারকোড স্ক্যান করুন।',
          as: 'হিচাপ কিতাপ পইণ্ট অব চেল বিলিঙলৈ স্বাগতম। কুইক এণ্ট্ৰী টেব খোলক আৰু দোকানৰ সামগ্ৰী নিৰ্বাচন কৰক বা বাৰক’ড স্কেন কৰক।',
        },
        indicPhonetic: {
          bn: 'हिसाब किताब पॉइंट ऑफ़ सेल बिलिंग में शागोतोम। क्विक एंट्री टैब खुलुन एबोंग पोन्यो निर्बाचन कोरुन बा बारकोड स्कैन कोरुन।',
          as: 'हिसाप किताब पॉइंट ऑफ़ सेल बिलिंगोले स्वागोतोम। क्विक एंट्री टेबल खोलोक आरु दोकानोर सामग्री बासोनी कोरॉक बा बारकोड स्कैन कोरॉक।',
        },
        icon: ShoppingCart,
        screenType: 'pos',
        highlights: ['Select products from catalog', 'Live barcode scanner available', 'Instant subtotal & tax computation'],
        simulatedData: {
          items: [
            { name: 'Fortune Sunlite Sunflower Oil 1L', qty: 2, price: 145 },
            { name: 'Aashirvaad Superior MP Shudh Chakki Atta 5kg', qty: 1, price: 260 },
          ],
          total: 550,
          discount: 20,
          net: 530,
        },
      },
      {
        title: 'Step 2: Customer Selection & Payment Mode',
        description: 'Link a customer to log Udhar balance, or proceed as Cash / UPI Walk-in.',
        narration: {
          en: 'Choose an existing customer for credit sales, or select Cash or UPI for instant settlement.',
          hi: 'उधार बिक्री के लिए ग्राहक चुनें, या तुरंत भुगतान के लिए कैश या यूपीआई चुनें।',
          bn: 'বাকির জন্য গ্রাহক নির্বাচন করুন অথবা দ্রুত নিষ্পত্তির জন্য ক্যাশ বা ইউপিআই বেছে নিন।',
          as: 'বাকী বিক্ৰীৰ বাবে গ্ৰাহক বাছক নাইবা নগদ বা ইউপিআই বাছক।',
        },
        indicPhonetic: {
          bn: 'बाकिर जोन्नो ग्राहक निर्वाचन कोरुन ओथोबा द्रुतो निशपोत्तिर जोन्नो कैश बा यूपीआई बेछे निन।',
          as: 'बाकी बिक्रिर बाबे ग्राहक बासक नाइबा नोगद बा यूपीआई बासोनी कोरॉक।',
        },
        icon: Users,
        screenType: 'pos',
        highlights: ['Log split cash + credit', 'Auto calculate customer pending balance', 'Supports UPI, Cash & Cards'],
        simulatedData: {
          customer: 'Ramesh Sharma (Shop Regular)',
          paid: 300,
          due: 230,
          paymentMethod: 'UPI',
        },
      },
      {
        title: 'Step 3: Complete Sale & Print Tax Invoice',
        description: 'Click Complete Sale to auto-deduct stock and generate clean 80mm thermal receipt or WhatsApp bill.',
        narration: {
          en: 'Click Complete Sale to generate an instant printable GST tax invoice and dispatch a WhatsApp receipt to the customer.',
          hi: 'सेल पूरी करें पर क्लिक करें और तुरंत प्रिंट करने योग्य जीएसटी इनवॉइस और व्हाट्सएप बिल प्राप्त करें।',
          bn: 'বিক্রি সম্পন্ন করুন বোতাম টিপে সঙ্গে সঙ্গে জিএসটি ইনভয়েস প্রিন্ট করুন এবং হোয়াটসঅ্যাপে রসিদ পাঠান।',
          as: 'বিক্ৰী সম্পূৰ্ণ কৰক আৰু লগে লগে প্ৰিণ্ট কৰিব পৰা জিএছটি ইনভইচ লাভ কৰক আৰু হোৱাটছএপত ৰচিদ পঠিয়াওক।',
        },
        indicPhonetic: {
          bn: 'बिक्री शम्पोन्नो कोरुन आरु जीएसटी इनवॉइस प्रिंट कोरुन एबोंग व्हाट्सएप ए रोशीद पाथान।',
          as: 'बिक्री सम्पुर्ण कोरॉक आरु लोटे लोटे प्रिंट कोरिवो पोरा जीएसटी इनवॉइस लाभ कोरॉक आरु व्हाट्सएपोत रोशीद पोथियावक।',
        },
        icon: Receipt,
        screenType: 'pos',
        highlights: ['80mm & A4 Print Formats', 'Direct WhatsApp share link', 'Inventory automatically deducted'],
        simulatedData: {
          invoiceNo: 'HK-2026-08492',
          status: 'PAID & RECORDED',
          timestamp: 'Just now',
        },
      },
    ],
  },
  {
    id: 'product-inventory',
    title: 'Managing Products & Low Stock Alerts',
    category: 'Inventory Management',
    durationSec: 40,
    description: 'Add new products, set purchase vs sale prices, manage categories, and configure low-stock safety thresholds.',
    scenes: [
      {
        title: 'Step 1: Add New Product & Category',
        description: 'Click "+ Add Product" and specify product category, unit, buy price, and sell price.',
        narration: {
          en: 'Manage your entire shop inventory with eight organized categories including Grocery, Stationery, Beverages, and Household items.',
          hi: 'किराना, स्टेशनरी, पेय पदार्थ और घरेलू सामान सहित आठ श्रेणियों के साथ अपनी दुकान की इन्वेंट्री प्रबंधित करें।',
          bn: 'মুদিখানা, স্টেশনারি ও গৃহস্থালি সহ আটটি ক্যাটাগরির সাথে আপনার দোকান পরিচালনা করুন।',
          as: 'মুদিখানা, ষ্টেচনেৰী আদি আঠটা বিভাগৰ সৈতে দোকানৰ সামগ্ৰী পৰিচালনা কৰক।',
        },
        indicPhonetic: {
          bn: 'मुदीखाना, स्टेशनरी ओ गृहस्थली शोहो आठ-टी कैटेगरीर शाथे आपनार दोकान पोरिचालोना कोरुन।',
          as: 'मुदीखाना, स्टेशनरी, पानीयो आरु घोरुवा सामग्री सोहो आठ-टा बिभागोर होइते आपुनार दोकान पोरिचालोना कोरॉक।',
        },
        icon: Package,
        screenType: 'products',
        highlights: ['8 Comprehensive Categories', 'Margin % auto calculated', 'Barcode assignment'],
        simulatedData: {
          name: 'Tata Tea Gold Leaf Pouch 500g',
          buyPrice: 240,
          sellPrice: 280,
          margin: '16.7% Profit',
        },
      },
      {
        title: 'Step 2: Low Stock Warning Thresholds',
        description: 'Set custom low-stock trigger levels so you never run out of fast-selling essentials.',
        narration: {
          en: 'Set low stock warning triggers so you receive instant alerts on your dashboard when stock is running out.',
          hi: 'कम स्टॉक अलर्ट सेट करें ताकि सामान खत्म होने से पहले आपको डैशबोर्ड पर तुरंत सूचना मिल सके।',
          bn: 'স্টক কমে গেলে ড্যাশবোর্ডে সতর্কতা পেতে লো স্টক লিমিট সেট করুন।',
          as: 'ষ্টক শেষ হোৱাৰ পূৰ্বে ডেশ্বব’ৰ্ডত জাননী পাবলৈ সতৰ্কবাৰ্তা ছেট কৰক।',
        },
        indicPhonetic: {
          bn: 'स्टॉक कोमे गेले डैशबोर्ड-ए शतोर्कोता पेते लो स्टॉक लिमिट सेट कोरुन।',
          as: 'स्टॉक शेष होवार पूर्वे डैशबोर्डोत जानोनी पाबोलई सोतर्कोबार्ता सेट कोरॉक।',
        },
        icon: Sparkles,
        screenType: 'products',
        highlights: ['Orange alert badges on Dashboard', 'Restock recommendation table', 'Export stock audit reports'],
        simulatedData: {
          currentStock: 4,
          alertThreshold: 5,
          status: '⚠️ LOW STOCK ALERT TRIGGERED',
        },
      },
    ],
  },
  {
    id: 'customer-khata',
    title: 'Customer Khata (Udhar) & WhatsApp Reminders',
    category: 'Customer Udhar',
    durationSec: 45,
    description: 'Keep accurate credit ledgers, log daily payments, show dynamic UPI QR codes, and send WhatsApp payment links.',
    scenes: [
      {
        title: 'Step 1: Open Customer Profile & Balance',
        description: 'Search customer name or mobile number to view lifetime credit and pending dues.',
        narration: {
          en: 'Track every customer credit account accurately. View outstanding credit balances and transaction histories.',
          hi: 'हर ग्राहक का उधार खाता सटीकता से ट्रैक करें। बकाया राशि और पुराना लेन-देन इतिहास देखें।',
          bn: 'প্রতিটি গ্রাহকের বাকি খাতা এবং পূর্বের লেনদেন ট্র্যাক করুন।',
          as: 'প্ৰতিজন গ্ৰাহকৰ বাকী খাতা আৰু পূৰ্বৰ লেনদেন সহজে চাওক।',
        },
        indicPhonetic: {
          bn: 'प्रोतीती ग्राहकेर बाकी खाता निर्भुलभावे हिसाब राखुन। बोकेया टाका एबोंग आगेर लेन-देन देखुन।',
          as: 'प्रोतीजोन ग्राहकोर बाकी खाता सोठीकभावे हिसाब राखोक। बाकी थोका टोका आरु पूर्बोर लेन-देन चावक।',
        },
        icon: Users,
        screenType: 'customer',
        highlights: ['Real-time outstanding calculation', 'Full credit & debit ledger history', 'One-click call & WhatsApp'],
        simulatedData: {
          customer: 'Anjali Devi',
          phone: '+91 98765 43210',
          totalDue: 1450,
          lastEntry: 'Yesterday - Groceries on credit (₹450)',
        },
      },
      {
        title: 'Step 2: Generate Dynamic UPI QR & Reminders',
        description: 'Display an instant pre-filled UPI QR code or send a polite WhatsApp payment reminder.',
        narration: {
          en: 'Generate dynamic UPI QR codes with payment amount pre-filled, and send automated WhatsApp reminders with payment links.',
          hi: 'अमाउंट के साथ डायनामिक यूपीआई क्यूआर कोड बनाएं और व्हाट्सएप पर पेमेंट लिंक भेजें।',
          bn: 'টাকার পরিমাণ সহ সরাসরি ইউপিআই কিউআর কোড তৈরি করুন এবং হোয়াটসঅ্যাপে পেমেন্ট লিংক পাঠান।',
          as: 'টকাৰ পৰিমাণ সহ ইউপিআই কিউআৰ ক’ড বনাওক আৰু হোৱাটছএপত পেমেন্ট লিংক পঠিয়াওক।',
        },
        indicPhonetic: {
          bn: 'टाकार पोरिमान शोहो शोराशोरी यूपीआई क्यूआर कोड तोइरी कोरुन एबोंग व्हाट्सएप ए पेमेंट लिंक पाथान।',
          as: 'टोकार पोरिमान सोहो यूपीआई क्यूआर कोड बनावक आरु व्हाट्सएपोत पेमेंट लिंक पोथियावक।',
        },
        icon: QrCode,
        screenType: 'customer',
        highlights: ['GPay / PhonePe / Paytm compatible', 'Direct UPI intent links', 'Itemized bill breakdown attached'],
        simulatedData: {
          upiId: 'manisanameetei7@okicici',
          amount: 1450,
          whatsappMsg: 'Namaste Anjali ji, your pending store due is ₹1,450. Click to pay via UPI: https://upi.link/..',
        },
      },
    ],
  },
  {
    id: 'backup-sync',
    title: 'Backup, Restore & Multi-Language Switching',
    category: 'Data & Security',
    durationSec: 35,
    description: 'Switch between English, Assamese, Bengali, and Hindi instantly. Download full offline backups.',
    scenes: [
      {
        title: 'Step 1: Change Shop Language in 1-Click',
        description: 'Toggle between English, অসমীয়া, বাংলা, and हिन्दी without refreshing.',
        narration: {
          en: 'Hisab Kitap offers regional language support in English, Assamese, Bengali, and Hindi.',
          hi: 'हिसाब किताब में अंग्रेजी, असमिया, बांग्ला और हिंदी का पूर्ण समर्थन उपलब्ध है।',
          bn: 'হিসাব কিতাব সম্পূর্ণ বাংলায়, অসমিয়ায়, হিন্দিতে এবং ইংরেজিতে ব্যবহার করুন।',
          as: 'হিচাপ কিতাপ সম্পূৰ্ণ অসমীয়া, বঙালী, হিন্দী আৰু ইংৰাজীত ব্যৱহাৰ কৰক।',
        },
        indicPhonetic: {
          bn: 'हिसाब किताब शम्पोर्नो बांलाय, असमियाय, हिंदिते एबोंग इंग्रेजिते ब्याबहार कोरुन।',
          as: 'हिसाप किताब सम्पुर्ण अखोमिया, बंगाली, हिन्दी आरु इंग्राजीत ब्याबहार कोरॉक।',
        },
        icon: Languages,
        screenType: 'backup',
        highlights: ['Instant UI language switch', 'Multilingual receipts & reports', 'Zero restart required'],
        simulatedData: {
          selected: 'অসমীয়া / বাংলা / हिन्दी / English',
        },
      },
      {
        title: 'Step 2: Export JSON Backup & Restore Ledger',
        description: 'Keep your store ledger safe by downloading offline JSON backups anytime.',
        narration: {
          en: 'Export complete backups of your shop data anytime and restore them securely on any new device.',
          hi: 'अपनी दुकान के डेटा का सुरक्षित बैकअप लें और किसी भी नए डिवाइस पर आसानी से रीस्टोर करें।',
          bn: 'যেকোনো সময় পুরো ডাটার ব্যাকআপ নিন এবং নতুন ডিভাইসে রিস্টোর করুন।',
          as: 'যিকোনো সময়ত সম্পূৰ্ণ তথ্য বেকআপ লওক আৰু নতুন ডিভাইচত সংস্থাপন কৰক।',
        },
        indicPhonetic: {
          bn: 'जेकोनो शोमोय दोकाने सम्पुर्ण डेटा बैकअप निन एबोंग नोतून डिवाइसे रिस्टोर कोरुन।',
          as: 'जिकोनो शोमोयोत दोकानोर शोकोलो तथ्य बैकअप लवॉक आरु नोतून डिवाइचोत रिस्टोर कोरॉक।',
        },
        icon: Database,
        screenType: 'backup',
        highlights: ['Encrypted JSON local storage backup', 'CSV spreadsheets for accountant', 'Secure 4-digit PIN lock'],
        simulatedData: {
          backupFile: 'hisapkitap_backup_2026.json',
          size: '42.8 KB',
          status: 'VERIFIED & COMPLETE',
        },
      },
    ],
  },
];

interface TutorialVideoPlayerProps {
  initialTutorialIndex?: number;
  lang: LanguageCode;
  onClose: () => void;
}

export const TutorialVideoPlayer: React.FC<TutorialVideoPlayerProps> = ({
  initialTutorialIndex = 0,
  lang,
  onClose,
}) => {
  const [selectedTutorialIdx, setSelectedTutorialIdx] = useState(initialTutorialIndex);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [videoLang, setVideoLang] = useState<LanguageCode>(lang);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('Kore');
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [isRealHumanVoiceActive, setIsRealHumanVoiceActive] = useState<boolean>(true);
  const [activeVoiceTitle, setActiveVoiceTitle] = useState<string>('✨ Ultra-Realistic Human Voice');

  const activeTutorial = TUTORIAL_DATA[selectedTutorialIdx] || TUTORIAL_DATA[0];
  const activeScene = activeTutorial.scenes[currentSceneIdx] || activeTutorial.scenes[0];
  const totalScenes = activeTutorial.scenes.length;

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stop any active audio
  const stopAllAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Helper to get narration text for current language
  const getSceneText = (scene: TutorialScene, l: LanguageCode) => {
    if (l === 'bn') return scene.narration.bn || scene.narration.en;
    if (l === 'as') return scene.narration.as || scene.narration.en;
    if (l === 'hi') return scene.narration.hi || scene.narration.en;
    return scene.narration.en;
  };

  // Helper to fallback to humanized browser speech if offline
  const speakBrowserFallback = (text: string, language: LanguageCode) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('bn') ||
        v.name.toLowerCase().includes('bengali')
    );
    const hiVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
    );
    const enVoice =
      voices.find((v) => v.lang === 'en-IN') ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
      null;

    let utteranceText = text;
    let targetVoice = enVoice;
    let langTag = 'en-IN';

    if (language === 'bn') {
      if (bnVoice) {
        targetVoice = bnVoice;
        langTag = bnVoice.lang;
      } else if (hiVoice) {
        targetVoice = hiVoice;
        utteranceText = activeScene.indicPhonetic.bn;
        langTag = hiVoice.lang;
      }
    } else if (language === 'as') {
      if (bnVoice) {
        targetVoice = bnVoice;
        langTag = bnVoice.lang;
      } else if (hiVoice) {
        targetVoice = hiVoice;
        utteranceText = activeScene.indicPhonetic.as;
        langTag = hiVoice.lang;
      }
    } else if (language === 'hi') {
      if (hiVoice) {
        targetVoice = hiVoice;
        langTag = hiVoice.lang;
      }
    }

    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.05; // Humanized melodic pitch
    utterance.lang = langTag;
    if (targetVoice) utterance.voice = targetVoice;

    window.speechSynthesis.speak(utterance);
    setActiveVoiceTitle('Natural Voice (Device Fallback)');
    setIsRealHumanVoiceActive(false);
  };

  // Play realistic human voice for active scene
  const playHumanVoiceForScene = async (sceneIndex: number) => {
    if (!voiceEnabled) return;
    const targetScene = activeTutorial.scenes[sceneIndex];
    if (!targetScene) return;

    stopAllAudio();
    setIsAudioLoading(true);

    const sceneText = getSceneText(targetScene, videoLang);

    try {
      // 1. Request ultra-realistic human audio from Gemini Studio TTS
      const wavBlobUrl = await fetchHumanSpeechAudio(
        sceneText,
        videoLang,
        selectedPersona
      );

      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
      }

      const audio = audioElementRef.current;
      audio.src = wavBlobUrl;
      audio.playbackRate = playbackSpeed;

      const personaObj = HUMAN_VOICE_PERSONAS.find((p) => p.id === selectedPersona);
      setActiveVoiceTitle(`✨ ${personaObj?.name || 'Real Human Voice'} (Studio HD)`);
      setIsRealHumanVoiceActive(true);

      if (isPlaying) {
        await audio.play();
      }

      setIsAudioLoading(false);

      // 2. Prefetch next scene audio in background for instantaneous transitions
      if (sceneIndex + 1 < totalScenes) {
        const nextScene = activeTutorial.scenes[sceneIndex + 1];
        const nextText = getSceneText(nextScene, videoLang);
        fetchHumanSpeechAudio(nextText, videoLang, selectedPersona).catch(() => {});
      }
    } catch (err) {
      console.warn('Backend human voice unavailable, switching to humanized device speech:', err);
      setIsAudioLoading(false);
      if (isPlaying) {
        speakBrowserFallback(sceneText, videoLang);
      }
    }
  };

  // Trigger audio whenever active scene, language, persona or playback changes
  useEffect(() => {
    if (!isPlaying) {
      stopAllAudio();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    playHumanVoiceForScene(currentSceneIdx);

    const sceneDurationMs = ((activeTutorial.durationSec / totalScenes) * 1000) / playbackSpeed;
    const intervalTick = 100;
    const stepIncrement = (intervalTick / sceneDurationMs) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSceneIdx < totalScenes - 1) {
            setCurrentSceneIdx((s) => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + stepIncrement;
      });
    }, intervalTick);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [
    isPlaying,
    currentSceneIdx,
    selectedTutorialIdx,
    playbackSpeed,
    videoLang,
    selectedPersona,
    voiceEnabled,
  ]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const handleTogglePlay = () => {
    if (progress >= 100 && currentSceneIdx >= totalScenes - 1) {
      setCurrentSceneIdx(0);
      setProgress(0);
      setIsPlaying(true);
    } else {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      if (!nextPlay) {
        stopAllAudio();
      }
    }
  };

  const handleRestart = () => {
    setCurrentSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
    playHumanVoiceForScene(0);
  };

  const handleNextScene = () => {
    if (currentSceneIdx < totalScenes - 1) {
      setCurrentSceneIdx((s) => s + 1);
      setProgress(0);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((s) => s - 1);
      setProgress(0);
    }
  };

  const handleSelectTutorial = (idx: number) => {
    setSelectedTutorialIdx(idx);
    setCurrentSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
    stopAllAudio();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050608]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className={`bg-[#101419] border border-[#26313B] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none' : 'w-full max-w-4xl max-h-[92vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-[#161C23] border-b border-[#26313B] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FF6F91]/20 text-[#FF6F91] flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6F91]">
                  Video Tutorial #{selectedTutorialIdx + 1}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#17D5B3]/20 text-[#17D5B3] text-[10px] font-extrabold border border-[#17D5B3]/40">
                  <Sparkles className="w-2.5 h-2.5" />
                  Human Voice Studio
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#F4F8FB] truncate">
                {activeTutorial.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-[#101419] p-0.5 rounded-lg border border-[#26313B]">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setVideoLang(l.code);
                    stopAllAudio();
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                    videoLang === l.code
                      ? 'bg-[#17D5B3] text-[#050608] shadow-sm'
                      : 'text-[#A8B5C2] hover:text-[#F4F8FB]'
                  }`}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-[#101419] hover:bg-[#26313B] text-[#A8B5C2] hover:text-[#F4F8FB] transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                stopAllAudio();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#101419] hover:bg-red-500/20 text-[#A8B5C2] hover:text-red-400 text-sm font-bold transition-colors"
              title="Close Player"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Video Presentation Stage */}
        <div className="relative bg-[#050608] flex-1 min-h-[320px] sm:min-h-[380px] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          {/* Animated Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#17D5B3]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#FF6F91]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Video Scene Content Display */}
          <div className="relative z-10 space-y-4">
            {/* Scene Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#26313B]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#17D5B3]/20 text-[#17D5B3] text-xs font-extrabold border border-[#17D5B3]/30">
                  Scene {currentSceneIdx + 1} of {totalScenes}
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#F4F8FB]">
                  {activeScene.title}
                </h4>
              </div>

              {/* Human Voice Persona Selector */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#161C23] px-2.5 py-1 rounded-lg border border-[#26313B]">
                  <UserCheck className="w-3.5 h-3.5 text-[#17D5B3]" />
                  <span className="text-[10px] text-[#A8B5C2] font-semibold hidden sm:inline">
                    Speaker:
                  </span>
                  <select
                    value={selectedPersona}
                    onChange={(e) => {
                      setSelectedPersona(e.target.value);
                      stopAllAudio();
                    }}
                    aria-label="Human Voice Persona"
                    className="bg-transparent text-xs font-bold text-[#F4F8FB] focus:outline-none cursor-pointer"
                  >
                    {HUMAN_VOICE_PERSONAS.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#161C23] text-white">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Simulated Live UI Interaction Screen */}
            <div className="bg-[#101419]/90 border border-[#26313B] rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              {activeScene.screenType === 'pos' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[#161C23] p-2.5 rounded-lg border border-[#26313B]">
                    <span className="text-xs font-bold text-[#17D5B3] flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5" /> Fast POS Terminal
                    </span>
                    <span className="text-[11px] font-mono text-[#F4F8FB] bg-[#101419] px-2 py-0.5 rounded border border-[#26313B]">
                      Invoice: {activeScene.simulatedData?.invoiceNo || 'HK-POS-08492'}
                    </span>
                  </div>

                  {activeScene.simulatedData?.items && (
                    <div className="space-y-1.5">
                      {activeScene.simulatedData.items.map((it: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-[#161C23] text-xs text-[#F4F8FB]"
                        >
                          <span>{it.name} (x{it.qty})</span>
                          <span className="font-mono font-bold text-[#17D5B3]">₹{it.price * it.qty}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 border-t border-[#26313B] text-xs font-bold text-[#F4F8FB]">
                        <span>Total Payable</span>
                        <span className="text-base text-[#17D5B3]">₹{activeScene.simulatedData.net}</span>
                      </div>
                    </div>
                  )}

                  {activeScene.simulatedData?.customer && (
                    <div className="p-3 bg-[#161C23] rounded-lg border border-[#26313B] text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-[#F4F8FB]">
                        <span>Customer Account:</span>
                        <span className="text-[#FF6F91]">{activeScene.simulatedData.customer}</span>
                      </div>
                      <div className="flex justify-between text-[#A8B5C2]">
                        <span>Paid Amount: ₹{activeScene.simulatedData.paid}</span>
                        <span className="text-red-400 font-bold">Pending Udhar: ₹{activeScene.simulatedData.due}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeScene.screenType === 'products' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[#161C23] p-2.5 rounded-lg border border-[#26313B]">
                    <span className="text-xs font-bold text-[#FF6F91] flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Product & Stock Manager
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      {activeScene.simulatedData?.status || 'Active Catalog'}
                    </span>
                  </div>

                  {activeScene.simulatedData?.name && (
                    <div className="p-3 bg-[#161C23] rounded-lg border border-[#26313B] space-y-2 text-xs">
                      <div className="font-bold text-[#F4F8FB] text-sm">
                        {activeScene.simulatedData.name}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#101419] p-2 rounded border border-[#26313B]">
                          <span className="text-[10px] text-[#A8B5C2]">Buy Price</span>
                          <p className="font-bold text-[#F4F8FB]">₹{activeScene.simulatedData.buyPrice}</p>
                        </div>
                        <div className="bg-[#101419] p-2 rounded border border-[#26313B]">
                          <span className="text-[10px] text-[#A8B5C2]">Sell Price</span>
                          <p className="font-bold text-[#17D5B3]">₹{activeScene.simulatedData.sellPrice}</p>
                        </div>
                        <div className="bg-[#101419] p-2 rounded border border-[#26313B]">
                          <span className="text-[10px] text-[#A8B5C2]">Margin</span>
                          <p className="font-bold text-[#FF6F91]">{activeScene.simulatedData.margin}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeScene.screenType === 'customer' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[#161C23] p-2.5 rounded-lg border border-[#26313B]">
                    <span className="text-xs font-bold text-[#17D5B3] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Customer Credit Ledger (Khata)
                    </span>
                    <span className="text-[11px] font-mono text-[#F4F8FB]">
                      UPI: {activeScene.simulatedData?.upiId}
                    </span>
                  </div>

                  {activeScene.simulatedData?.customer && (
                    <div className="p-3 bg-[#161C23] rounded-lg border border-[#26313B] space-y-2 text-xs">
                      <div className="flex justify-between font-bold text-[#F4F8FB]">
                        <span>{activeScene.simulatedData.customer}</span>
                        <span className="text-red-400 font-extrabold text-sm">Due: ₹{activeScene.simulatedData.totalDue}</span>
                      </div>
                      <div className="p-2 rounded bg-[#101419] border border-dashed border-[#26313B] text-[11px] text-[#A8B5C2] italic">
                        "{activeScene.simulatedData.whatsappMsg}"
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeScene.screenType === 'backup' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[#161C23] p-2.5 rounded-lg border border-[#26313B]">
                    <span className="text-xs font-bold text-[#17D5B3] flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> Local Cloud & Backup Engine
                    </span>
                    <span className="text-[10px] font-bold text-[#17D5B3] bg-[#17D5B3]/20 px-2 py-0.5 rounded">
                      {activeScene.simulatedData?.status || 'HEALTHY'}
                    </span>
                  </div>

                  <div className="p-3 bg-[#161C23] rounded-lg border border-[#26313B] space-y-2 text-xs">
                    <p className="text-[#F4F8FB]">
                      Supported Languages: <span className="font-bold text-[#17D5B3]">English, অসমীয়া, বাংলা, हिन्दी</span>
                    </p>
                    <div className="flex items-center justify-between bg-[#101419] p-2 rounded border border-[#26313B] text-[11px] font-mono text-[#A8B5C2]">
                      <span>File: hisapkitap_backup.json</span>
                      <span className="text-[#17D5B3] font-bold">100% Offline Safe</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bullet highlights for current step */}
              <div className="mt-3 pt-2.5 border-t border-[#26313B]/60 flex flex-wrap gap-2">
                {activeScene.highlights.map((hl, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#161C23] border border-[#26313B] text-[11px] font-semibold text-[#A8B5C2]"
                  >
                    <CheckCircle className="w-3 h-3 text-[#17D5B3]" />
                    {hl}
                  </span>
                ))}
              </div>
            </div>

            {/* Audio Voiceover Subtitles / Studio Player Bar */}
            <div className="bg-[#101419]/95 border border-[#17D5B3]/30 rounded-xl p-3 flex items-start gap-3 shadow-lg">
              {/* Animated Equalizer Waveform */}
              <div className="p-2 rounded-lg bg-[#17D5B3]/10 text-[#17D5B3] shrink-0 mt-0.5 flex items-center justify-center">
                {isAudioLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#17D5B3]" />
                ) : voiceEnabled && isPlaying ? (
                  <div className="flex items-end gap-0.5 h-5 w-5 justify-center">
                    <span className="w-1 bg-[#17D5B3] rounded-full animate-bounce [animation-delay:0.1s] h-3" />
                    <span className="w-1 bg-[#17D5B3] rounded-full animate-bounce [animation-delay:0.2s] h-5" />
                    <span className="w-1 bg-[#17D5B3] rounded-full animate-bounce [animation-delay:0.3s] h-4" />
                    <span className="w-1 bg-[#17D5B3] rounded-full animate-bounce [animation-delay:0.15s] h-2" />
                  </div>
                ) : (
                  <VolumeX className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div className="text-xs leading-relaxed text-[#F4F8FB] w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#17D5B3] flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" />
                      Human Voiceover ({LANGUAGES.find((l) => l.code === videoLang)?.nativeLabel}):
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#161C23] border border-[#26313B] text-[10px] font-medium text-[#A8B5C2]">
                      {activeVoiceTitle}
                    </span>
                  </div>

                  {isAudioLoading && (
                    <span className="text-[10px] text-[#17D5B3] font-mono animate-pulse">
                      Generating studio human audio...
                    </span>
                  )}
                </div>

                <p className="font-semibold text-sm sm:text-base text-[#F4F8FB] leading-relaxed">
                  "{getSceneText(activeScene, videoLang)}"
                </p>
              </div>
            </div>
          </div>

          {/* Video Playback Controls Bar */}
          <div className="relative z-10 mt-4 pt-3 border-t border-[#26313B] space-y-2">
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-2">
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  setProgress(Math.max(0, Math.min(100, clickPos * 100)));
                }}
                className="relative flex-1 h-2 bg-[#161C23] rounded-full overflow-hidden cursor-pointer group"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#17D5B3] via-[#54B6FF] to-[#FF6F91] transition-all duration-150 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#A8B5C2] shrink-0">
                {Math.round((progress / 100) * (activeTutorial.durationSec / totalScenes))}s /{' '}
                {Math.round(activeTutorial.durationSec / totalScenes)}s
              </span>
            </div>

            {/* Media Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-2 rounded-xl bg-[#17D5B3] hover:bg-[#15C2A3] text-[#050608] font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Tutorial</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 rounded-xl bg-[#161C23] hover:bg-[#26313B] text-[#A8B5C2] hover:text-[#F4F8FB] transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevScene}
                    disabled={currentSceneIdx === 0}
                    className="p-2 rounded-xl bg-[#161C23] hover:bg-[#26313B] disabled:opacity-40 text-[#A8B5C2] hover:text-[#F4F8FB] transition-colors"
                    title="Previous Scene"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextScene}
                    disabled={currentSceneIdx === totalScenes - 1}
                    className="p-2 rounded-xl bg-[#161C23] hover:bg-[#26313B] disabled:opacity-40 text-[#A8B5C2] hover:text-[#F4F8FB] transition-colors"
                    title="Next Scene"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice Narration Toggle */}
                <button
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (!next) stopAllAudio();
                    else playHumanVoiceForScene(currentSceneIdx);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    voiceEnabled
                      ? 'bg-[#17D5B3]/20 border-[#17D5B3]/50 text-[#17D5B3]'
                      : 'bg-[#161C23] border-[#26313B] text-[#A8B5C2]'
                  }`}
                  title="Toggle Audio Voice Narration"
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{voiceEnabled ? 'Human Voice ON' : 'Muted'}</span>
                </button>

                {/* Speed selector */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  aria-label="Playback speed selector"
                  className="bg-[#161C23] border border-[#26313B] text-[#F4F8FB] text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none"
                >
                  <option value="0.75">0.75x</option>
                  <option value="1">1.0x (Normal)</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Video Tutorial Playlist & Guide Switcher */}
        <div className="p-3 sm:p-4 bg-[#161C23] border-t border-[#26313B] overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {TUTORIAL_DATA.map((tut, idx) => (
              <button
                key={tut.id}
                onClick={() => handleSelectTutorial(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all max-w-[220px] ${
                  selectedTutorialIdx === idx
                    ? 'bg-[#101419] border-[#FF6F91] shadow-md ring-1 ring-[#FF6F91]'
                    : 'bg-[#101419]/60 border-[#26313B] hover:border-[#A8B5C2]/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-[#A8B5C2] mb-1">
                  <span className={selectedTutorialIdx === idx ? 'text-[#FF6F91]' : ''}>
                    Video #{idx + 1}
                  </span>
                  <span>⏱️ {tut.durationSec}s</span>
                </div>
                <div className="text-xs font-bold text-[#F4F8FB] truncate">
                  {tut.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
