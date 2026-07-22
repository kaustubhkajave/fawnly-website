import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Fawnly handles Apple Health activity, recorded outdoor activities, precise routes, widgets, Live Activities, subscriptions, and other local app data.",
  alternates: { canonical: "https://getfawnly.com/privacy/" },
  openGraph: { title: "Fawnly Privacy Policy", description: "Fawnly is local-first, with no account, ads, cross-app tracking, or Fawnly cloud sync.", url: "https://getfawnly.com/privacy/" },
};

export default function Privacy() {
  return (
    <main className="page"><article className="wrap legal-page prose">
      <span className="eyebrow">Local-first by design</span>
      <h1 className="display legal-title">Fawnly Privacy Policy</h1>
      <p className="legal-updated">Last updated: July 22, 2026</p>
      <p>Fawnly is a local-first walking and activity app. It helps you view Apple Health activity, record outdoor walks and other supported activities, keep route history, use Home Screen widgets, and personalize your experience.</p>

      <h2>Data Stored on Your Device</h2>
      <p>Fawnly stores app data locally on your device. This may include:</p>
      <ul><li>Step and daily activity history shown in the app</li><li>Recorded activity summaries, active-time intervals, and precise GPS route points</li><li>Your daily walking goal, distance unit, Home metric, hero font, theme, and readability preferences</li><li>Optional daily and weekly recap notification preferences</li><li>Limited local snapshots used by Home Screen widgets and Lock Screen or Dynamic Island Live Activities</li><li>Onboarding and other app settings</li><li>Legacy height, weight, or stride settings from earlier versions, if already stored</li></ul>
      <p>This data is used to make the app work on your device. Fawnly does not sync it to a Fawnly server.</p>

      <h2>Home Screen Widgets and Live Activities</h2>
      <p>A Home Screen widget uses a limited local snapshot in Fawnly’s private iOS App Group container. It can include the date, last-updated time, Apple Health connection state, steps, distance, active calories, floors, daily goal, and distance unit. The widget does not read Apple Health directly and does not store your name, account identifiers, routes, precise location, or subscription information.</p>
      <p>During a recorded activity, Fawnly may show a Live Activity with the activity type, recording state, elapsed time, distance, and pace. It does not include route coordinates. Availability and presentation are controlled by iOS.</p>

      <h2>Accounts, Ads, Analytics, and Tracking</h2>
      <p>Fawnly does not require an account and does not include Fawnly cloud sync. It does not include ads or advertising trackers, does not sell your data, and does not track you across other companies’ apps or websites. The only third-party service Fawnly uses is RevenueCat, solely to manage Fawnly Plus subscriptions.</p>

      <h2>Apple Health on iPhone</h2>
      <p>With permission, Fawnly reads step count, walking and running distance, active energy burned, and flights climbed from Apple Health. Flights climbed may be displayed as floors. This data is processed on your device and used only to show activity and history inside Fawnly.</p>
      <p>If you enable <strong>Save activities to Apple Health</strong>, Fawnly can write a completed walking, hiking, or running workout and its recorded GPS route. Fawnly does not write steps, calories, or elevation. The setting is off by default, and a workout saved to Apple Health remains managed there if you delete the local Fawnly copy.</p>
      <p>If you choose <strong>Restore from Apple Health</strong>, Fawnly reads only workouts tagged as created by Fawnly and stores recovered summaries and available route points locally. Restored session steps remain unavailable because Fawnly does not write step samples. Restoration does not upload data or alter Home or History totals.</p>
      <p>Fawnly does not transmit Apple Health data to a Fawnly server or RevenueCat. You can revoke access in the Health app under Sharing → Apps → Fawnly.</p>

      <h2>Location and Recorded Routes</h2>
      <p>Fawnly requests location access only when you choose to start an outdoor activity. Location calculates session distance and pace, draws the route, and—when background access is granted—allows recording while the screen is locked.</p>
      <p>Recorded GPS coordinates and routes stay locally on your device. They are not uploaded to a Fawnly server or RevenueCat. If background access is not granted, Fawnly offers foreground-only recording and asks you to keep the app open. Apple Maps and iOS location services are provided by Apple under Apple’s privacy terms.</p>
      <p>Plus route cards transform recorded points locally into a normalized route silhouette. They do not include an Apple Maps background, raw coordinates, start or finish markers, home labels, or place names. A familiar route shape can still reveal information, so review the card before sharing. It leaves your device only through the system share destination you choose.</p>

      <h2>Motion & Fitness and Cadence</h2>
      <p>Fawnly may request Motion & Fitness access when you start a recorded activity, only to show optional live steps for that session. If unavailable, session steps are shown as unavailable. Paced Walk can play a metronome-style cadence beat; Fawnly does not request microphone access or record audio.</p>

      <h2>Android Step Counting</h2>
      <p>On Android, Fawnly reads activity from Health Connect when it is available and you grant permission; otherwise it counts live steps using the device step sensor while the app is open. Android distance and calorie values may be estimates. This activity data is used only inside Fawnly and stays on your device.</p>

      <h2>Notifications</h2>
      <p>Notifications are optional. Fawnly can schedule a local daily reminder, and Plus subscribers can enable a weekly recap that opens the weekly step card. These notifications do not include exact step counts, calories, or distance. Permission is requested only when you choose to enable a reminder.</p>

      <h2>Activity Values</h2>
      <p>On iPhone, Home and History values come from Apple Health. If distance, active calories, or flights climbed are unavailable, Fawnly shows them as unavailable rather than calculating replacements. Recorder values remain separate session details and are never manually added to Apple Health-backed daily totals. GPS distance and pace can vary with signal and surroundings and are for general wellness context only.</p>

      <h2>Purchases and Subscriptions</h2>
      <p>Fawnly Plus is an optional subscription. Purchases are handled by Apple or Google; Fawnly never sees your card or full payment details. RevenueCat receives an app-generated random subscriber ID, purchase and subscription history, and basic device and app information to verify and manage your subscription. RevenueCat does not receive Apple Health, activity, or route data and this information is not used for advertising or cross-app tracking. Read <a href="https://www.revenuecat.com/privacy">RevenueCat’s privacy policy</a>.</p>

      <h2>Deleting Your Data</h2>
      <p>You can delete individual local recorded activities in Fawnly. Deleting a local activity does not delete a workout already saved to Apple Health. Other local Fawnly data can be removed by deleting the app or clearing its stored data where supported. Shared images and device backups are controlled by the destination or operating-system service you chose.</p>

      <h2>Not Medical Advice and Activity Safety</h2>
      <p>Fawnly is not a medical device and does not provide medical advice, diagnosis, or treatment. Pay attention to your surroundings, local conditions, and your own limits while recording an activity.</p>

      <h2>Contact</h2>
      <p>For privacy or support questions, contact <a href="mailto:fawnlyapp@outlook.com">fawnlyapp@outlook.com</a>.</p>
      <div className="legal-links"><a href="/support">Support</a><a href="/terms">Terms of Use</a></div>
    </article></main>
  );
}
