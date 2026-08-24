// Human voice audio synthesizer and PCM-to-WAV converter for Hisab Kitap

export interface HumanVoicePersona {
  id: string;
  voiceName: 'Kore' | 'Zephyr' | 'Aoede' | 'Puck' | 'Fenrir' | 'Charon';
  name: string;
  gender: 'female' | 'male';
  langSpecialty: string;
  assameseTitle: string;
  description: string;
  badge: string;
  avatarIcon: string;
}

export const HUMAN_VOICE_PERSONAS: HumanVoicePersona[] = [
  {
    id: 'pratibha-as-female',
    voiceName: 'Kore',
    name: 'Pratibha (প্রতিভা - অসমীয়া মহিলা কণ্ঠ)',
    gender: 'female',
    langSpecialty: 'as',
    assameseTitle: 'প্রতিভা (অনুপম স্নিগ্ধ মহিলা কণ্ঠ)',
    description: 'Warm, natural, ultra-realistic Assamese female voice for tutorials',
    badge: 'অসমীয়া মহিলা কণ্ঠ (Recommended)',
    avatarIcon: '👩',
  },
  {
    id: 'jonali-as-female',
    voiceName: 'Zephyr',
    name: 'Jonali (জোনালী - নম্ৰ অসমীয়া মহিলা কণ্ঠ)',
    gender: 'female',
    langSpecialty: 'as',
    assameseTitle: 'জোনালী (নম্ৰ আৰু মাধুৰ্য্যপূৰ্ণ)',
    description: 'Calm, gentle & friendly Assamese female voice for ledger & billing guides',
    badge: 'নম্ৰ অসমীয়া কণ্ঠ',
    avatarIcon: '🌸',
  },
  {
    id: 'rupali-as-female',
    voiceName: 'Aoede',
    name: 'Rupali (ৰূপালী - উজ্জ্বল শিক্ষণীয় কণ্ঠ)',
    gender: 'female',
    langSpecialty: 'as',
    assameseTitle: 'ৰূপালী (শিক্ষণীয় মহিলা কণ্ঠ)',
    description: 'Melodious, lively Assamese female educator voice',
    badge: 'শিক্ষণীয় কণ্ঠ',
    avatarIcon: '✨',
  },
  {
    id: 'kore-female',
    voiceName: 'Kore',
    name: 'Kore (Warm Female / সার্বজনীন মহিলা)',
    gender: 'female',
    langSpecialty: 'all',
    assameseTitle: 'কোৰ (উষ্ণ মহিলা কণ্ঠ)',
    description: 'Friendly, warm, and natural store companion',
    badge: 'Warm & Expressive',
    avatarIcon: '🎙️',
  },
  {
    id: 'zephyr-female',
    voiceName: 'Zephyr',
    name: 'Zephyr (Calm Female / শান্ত মহিলা)',
    gender: 'female',
    langSpecialty: 'all',
    assameseTitle: 'জেফিৰ (শান্ত মহিলা কণ্ঠ)',
    description: 'Gentle, soothing, and easy to follow',
    badge: 'Calm & Gentle',
    avatarIcon: '🕊️',
  },
  {
    id: 'pravin-as-male',
    voiceName: 'Puck',
    name: 'Pravin (প্ৰবীন - অসমীয়া পুৰুষ কণ্ঠ)',
    gender: 'male',
    langSpecialty: 'as',
    assameseTitle: 'প্ৰবীন (সজীৱ পুৰুষ কণ্ঠ)',
    description: 'Energetic, crisp Assamese male mentor for fast POS tutorials',
    badge: 'অসমীয়া পুৰুষ কণ্ঠ',
    avatarIcon: '👨',
  },
  {
    id: 'bhaskar-as-male',
    voiceName: 'Fenrir',
    name: 'Bhaskar (ভাস্কৰ - গম্ভীৰ বৰ্ণনাকাৰী)',
    gender: 'male',
    langSpecialty: 'as',
    assameseTitle: 'ভাস্কৰ (গম্ভীৰ পুৰুষ কণ্ঠ)',
    description: 'Confident, deep, and authoritative voice for reports & backup',
    badge: 'গম্ভীৰ বৰ্ণনাকাৰী',
    avatarIcon: '💼',
  },
  {
    id: 'puck-male',
    voiceName: 'Puck',
    name: 'Puck (Cheerful Male)',
    gender: 'male',
    langSpecialty: 'all',
    assameseTitle: 'পাক (সজীৱ পুৰুষ কণ্ঠ)',
    description: 'Energetic, helpful, and clear mentor',
    badge: 'Energetic & Crisp',
    avatarIcon: '⚡',
  },
  {
    id: 'charon-male',
    voiceName: 'Charon',
    name: 'Charon (Professional Male)',
    gender: 'male',
    langSpecialty: 'all',
    assameseTitle: 'কেৰন (পেছাদাৰী দোকানদাৰ কণ্ঠ)',
    description: 'Professional, articulate shopkeeper tone',
    badge: 'Professional',
    avatarIcon: '🏪',
  },
];

// Assamese Tutorial voice preset samples for the Studio
export interface AssameseStudioPreset {
  id: string;
  titleAs: string;
  titleEn: string;
  category: string;
  recommendedVoiceId: string;
  assameseText: string;
  englishTranslation: string;
}

export const ASSAMESE_STUDIO_PRESETS: AssameseStudioPreset[] = [
  {
    id: 'pos-billing-as',
    titleAs: '১. পিঅ’এছ দ্ৰুত বিলিং আৰু ৰচিদ প্ৰিণ্ট',
    titleEn: '1. Fast POS Billing & Thermal Receipts',
    category: 'Billing & POS',
    recommendedVoiceId: 'pratibha-as-female',
    assameseText:
      'হিচাপ কিতাপ পইণ্ট অব চেল বিলিঙলৈ আপোনাক স্বাগতম। কুইক এণ্ট্ৰী টেব খোলক, সামগ্ৰী নিৰ্বাচন কৰক বা বাৰক’ড স্কেন কৰক। সম্পূৰ্ণ বিক্ৰী বোতামত টিপি লগে লগে জিএছটি ইনভইচ লাভ কৰক আৰু হোৱাটছএপত ৰচিদ পঠিয়াওক।',
    englishTranslation:
      'Welcome to Hisab Kitap Point of Sale billing. Open the Quick Entry tab, select products or scan barcodes. Click Complete Sale to print instant GST invoices and send WhatsApp receipts.',
  },
  {
    id: 'customer-khata-as',
    titleAs: '২. গ্ৰাহকৰ বাকী খাতা আৰু হোৱাটছএপ লিংক',
    titleEn: '2. Customer Khata & WhatsApp Payment Links',
    category: 'Credit & Khata',
    recommendedVoiceId: 'jonali-as-female',
    assameseText:
      'প্ৰতিজন গ্ৰাহকৰ বাকী খাতা অতি নিৰ্ভুলভাৱে পৰিচালনা কৰক। গ্ৰাহকৰ নাম বিচাৰি বাকী ধন চাওক, কিউআৰ ক’ড দেখুৱাই ধন সংগ্ৰহ কৰক আৰু মাত্ৰ এটা ক্লিকেৰে হোৱাটছএপত পৰিশোধৰ লিংক পঠিয়াওক।',
    englishTranslation:
      'Manage every customer credit ledger with 100% accuracy. Search customer names to check dues, collect via UPI QR, and send WhatsApp payment reminders in one click.',
  },
  {
    id: 'inventory-alerts-as',
    titleAs: '৩. দোকানৰ সামগ্ৰী আৰু ষ্টক সতৰ্কবাৰ্তা',
    titleEn: '3. Product Inventory & Low Stock Alerts',
    category: 'Inventory',
    recommendedVoiceId: 'rupali-as-female',
    assameseText:
      'দোকানৰ সামগ্ৰী শেষ হোৱাৰ পূৰ্বেই ডেশ্বব’ৰ্ডত সতৰ্কবাৰ্তা লাভ কৰক। ক্ৰয় মূল্য আৰু বিক্ৰী মূল্য নিৰ্ধাৰণ কৰি লাভৰ শতাংশ স্বয়ংক্ৰিয়ভাৱে হিচাপ কৰক আৰু ব্যৱসায় বৃদ্ধি কৰক।',
    englishTranslation:
      'Get instant warnings on your dashboard before essential store items run out. Configure buy and sell prices to auto-calculate margins and grow your retail business.',
  },
  {
    id: 'backup-restore-as',
    titleAs: '৪. অফলাইন বেকআপ আৰু ভাষা পৰিৱৰ্তন',
    titleEn: '4. Offline Cloud Backup & Regional Languages',
    category: 'Data & Security',
    recommendedVoiceId: 'pratibha-as-female',
    assameseText:
      'হিচাপ কিতাপ সম্পূৰ্ণ অসমীয়া, বাংলা, হিন্দী আৰু ইংৰাজীত উপলব্ধ। যিকোনো সময়তে আপোনাৰ দোকানৰ সম্পূৰ্ণ তথ্য সুৰক্ষিতভাৱে বেকআপ লওক আৰু পিন লক ব্যৱহাৰ কৰি সুৰক্ষিত ৰাখক।',
    englishTranslation:
      'Hisab Kitap offers regional language support in Assamese, Bengali, Hindi, and English. Download offline JSON backups anytime and lock the ledger with 4-digit PIN security.',
  },
  {
    id: 'store-welcome-as',
    titleAs: '৫. দোকানৰ দৈনিক শুভ উদ্বোধন বাৰ্তা',
    titleEn: '5. Daily Store Greeting & Welcome Announcement',
    category: 'Store Greetings',
    recommendedVoiceId: 'pratibha-as-female',
    assameseText:
      'নমস্কাৰ! আমাৰ দোকানলৈ আপোনাক আন্তৰিক স্বাগতম। আজিৰ সকলো লেনদেন আৰু হিচাপ-নিকাচ সুন্দৰভাৱে লিপিবদ্ধ কৰক। আপোনাৰ দিনটো শুভ আৰু ব্যৱসায় লাভজনক হওক!',
    englishTranslation:
      'Namaskar! Welcome to our store. Accurately record all daily sales and khata entries. Wishing you a profitable and successful business day!',
  },
  {
    id: 'payment-reminder-as',
    titleAs: '৬. গ্ৰাহকৰ বাকী ধন পৰিশোধৰ অনুৰোধ',
    titleEn: '6. Polite Due Payment Voice Reminder',
    category: 'Store Greetings',
    recommendedVoiceId: 'jonali-as-female',
    assameseText:
      'নমস্কাৰ গ্ৰাহক ডাঙৰীয়া, আপোনাৰ দোকানৰ বাকী ধনৰ হিচাপ আপডেট কৰা হৈছে। অনুগ্ৰহ কৰি তলত দিয়া ইউপিআই লিংক বা কিউআৰ ক’ডৰ জৰিয়তে পৰিশোধ কৰক। ধন্যবাদ!',
    englishTranslation:
      'Namaskar respected customer, your store credit ledger has been updated. Kindly settle the pending due via the UPI link or QR code below. Thank you!',
  },
];

// In-memory cache of generated WAV blob URLs to avoid redundant network requests
const blobUrlCache = new Map<string, string>();

/**
 * Converts raw 24kHz 16-bit Mono Little-Endian PCM data (base64) into a playable WAV Blob URL
 */
export function pcmBase64ToWavBlobUrl(base64Data: string, sampleRate = 24000): string {
  try {
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);

    // 0x00: "RIFF"
    view.setUint32(0, 0x52494646, false);
    // 0x04: file size - 8
    view.setUint32(4, 36 + bytes.length, true);
    // 0x08: "WAVE"
    view.setUint32(8, 0x57415645, false);
    // 0x0C: "fmt "
    view.setUint32(12, 0x666d7420, false);
    // 0x10: sub-chunk size (16 for PCM)
    view.setUint32(16, 16, true);
    // 0x14: audio format (1 = PCM)
    view.setUint16(20, 1, true);
    // 0x16: num channels (1 = mono)
    view.setUint16(22, 1, true);
    // 0x18: sample rate
    view.setUint32(24, sampleRate, true);
    // 0x1C: byte rate (SampleRate * NumChannels * BitsPerSample/8)
    view.setUint32(28, sampleRate * 2, true);
    // 0x20: block align (NumChannels * BitsPerSample/8)
    view.setUint16(32, 2, true);
    // 0x22: bits per sample (16)
    view.setUint16(34, 16, true);
    // 0x24: "data"
    view.setUint32(36, 0x64617461, false);
    // 0x28: data size
    view.setUint32(40, bytes.length, true);

    const blob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Error converting PCM to WAV:', err);
    throw err;
  }
}

/**
 * Fetches realistic human voice audio from backend Gemini TTS endpoint
 */
export async function fetchHumanSpeechAudio(
  text: string,
  lang: string,
  personaOrVoiceName: string = 'Kore'
): Promise<string> {
  // Map persona id to prebuilt Gemini voice name if persona id passed
  const foundPersona = HUMAN_VOICE_PERSONAS.find((p) => p.id === personaOrVoiceName);
  const geminiVoice = foundPersona ? foundPersona.voiceName : personaOrVoiceName;

  const cacheKey = `${lang}_${geminiVoice}_${text.trim()}`;
  if (blobUrlCache.has(cacheKey)) {
    return blobUrlCache.get(cacheKey)!;
  }

  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      lang,
      voice: geminiVoice,
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS server responded with status: ${response.status}`);
  }

  const data = await response.json();
  if (!data.audio) {
    throw new Error(data.error || 'No audio data returned from speech engine');
  }

  const wavBlobUrl = pcmBase64ToWavBlobUrl(data.audio, 24000);
  blobUrlCache.set(cacheKey, wavBlobUrl);
  return wavBlobUrl;
}

/**
 * Download synthesized audio file
 */
export function downloadWavAudio(blobUrl: string, filename: string = 'hisapkitap_assamese_tutorial.wav') {
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
