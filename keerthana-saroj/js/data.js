/* ============================================================
   Keerthana & Saroj Kalyan — wedding site content
   ------------------------------------------------------------
   Update this file whenever details change.
   Leave a field as "" or [] if it is not ready yet.
   The page will show a graceful "coming soon" state.
   ============================================================ */

window.SITE = {
  siteUrl: "https://pramodh42.github.io/my_portfolio/keerthana-saroj/",
  whatsapp: "",
  contactEmail: "",

  couple: {
    bride: {
      first: "Keerthana",
      last: "Ippili",
      full: "Keerthana Ippili",
      telugu: "కీర్తన ఇప్పిలి",
      note: "Daughter of the Ippili family",
      image: "images/bride.jpg"
    },
    groom: {
      first: "Saroj Kalyan",
      last: "Potunuru",
      full: "Saroj Kalyan Potunuru",
      telugu: "సరోజ్ కల్యాణ్ పోతునూరు",
      note: "Son of the Potunuru family",
      image: "images/groom.jpg"
    }
  },

  invitation: {
    kickerEn: "Together with their families",
    kickerTe: "నిశ్చితార్థం",
    letter:
      "With the blessings of the divine and our elders, the families of Ippili and Potunuru joyfully invite you to celebrate the Nischitartham of their children. Your presence is the gift we treasure most.",
    closing: "With love, The Ippili & Potunuru families"
  },

  /* Featured countdown uses the first event with a date.
     After engagement day, the marriage event becomes the focus
     as soon as its date is filled in. */
  events: [
    {
      id: "engagement",
      kicker: "Nischitartham",
      kickerTe: "నిశ్చితార్థం",
      title: "Engagement",
      date: "2026-10-29",
      time: "",
      venue: "",
      address: "",
      city: "",
      mapUrl: "",
      dress: "",
      notes: "Venue, time and the evening plan will be posted here. Please check back — this page is the invitation.",
      status: "upcoming"
    },
    {
      id: "marriage",
      kicker: "Vivaha Mahotsavam",
      kickerTe: "వివాహ మహోత్సవం",
      title: "Marriage",
      date: "",
      time: "",
      venue: "",
      address: "",
      city: "",
      mapUrl: "",
      dress: "",
      notes: "Marriage date, venues, live video links and the full wedding itinerary will appear here.",
      status: "soon"
    }
  ],

  /* Day-of schedule. Add rows as plans lock in. */
  plans: [
    {
      id: "eng-ceremony",
      eventId: "engagement",
      title: "Engagement ceremony",
      date: "2026-10-29",
      time: "",
      description: "Nischitartham of Keerthana and Saroj Kalyan. Time and hall details will be shared here."
    },
    {
      id: "eng-dinner",
      eventId: "engagement",
      title: "Family dinner",
      date: "2026-10-29",
      time: "",
      description: "To be confirmed. We will update this the moment it is final."
    },
    {
      id: "wedding-day",
      eventId: "marriage",
      title: "Wedding day",
      date: "",
      time: "",
      description: "Muhurtham, venues and the full wedding-day plan will be published here."
    }
  ],

  locations: [
    {
      id: "engagement-venue",
      name: "Engagement venue",
      role: "Nischitartham",
      address: "To be announced",
      mapUrl: "",
      note: "We will pin the exact location with a maps link as soon as it is confirmed."
    }
  ],

  /* YouTube, Vimeo or a direct video URL. */
  videos: [],

  updates: [
    {
      date: "2026-10-27",
      title: "The invitation is open",
      body: "Welcome to Keerthana and Saroj Kalyan's celebration page. Engagement is on 29 October 2026. Venue, timing, travel notes and later the wedding films will all live here — one link for the whole journey."
    }
  ],

  gallery: [
    { src: "images/couple.jpg", alt: "Keerthana and Saroj Kalyan", caption: "The couple" },
    { src: "images/bride.jpg", alt: "Keerthana Ippili", caption: "Keerthana" },
    { src: "images/groom.jpg", alt: "Saroj Kalyan Potunuru", caption: "Saroj Kalyan" },
    { src: "images/mandap.jpg", alt: "Under the mandap", caption: "Under the mandap" }
  ],

  blessings: [
    {
      from: "The families",
      message: "Two houses, one celebration. We cannot wait to welcome you."
    }
  ]
};
