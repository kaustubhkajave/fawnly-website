import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Fawnly, Apple Health permissions, outdoor activity recording, private routes, widgets, Live Activities, reminders, and Fawnly Plus.",
  alternates: { canonical: "https://fawnly.app/support/" },
  openGraph: { title: "Fawnly Support", description: "Help with Apple Health, activity recording, routes, widgets, reminders, and Fawnly Plus.", url: "https://fawnly.app/support/" },
};

const supportSections = [
  ["Apple Health on iPhone", <>Fawnly reads steps, walking and running distance, active energy, and flights climbed from Apple Health with your permission. Review access in the Health app under <strong>Sharing → Apps → Fawnly</strong>.</>],
  ["Steps, distance, or calories are not updating", <>Open Health → Sharing → Apps → Fawnly and allow Steps, Walking + Running Distance, Active Energy, and Flights Climbed. If Apple Health does not provide a value for a period, Fawnly may show a dash.</>],
  ["Recording an activity", <>Walk recording is free. Paced Walk, Hike, and Run require Fawnly Plus. Location is requested only when you start your first recording. The recorder shows active time, GPS distance, pace, an Apple Maps route, and optional live steps, with Pause, Resume, and Finish controls.</>],
  ["Paced Walk", <>Choose Easy, Steady, Brisk, or a custom steps-per-minute target. The cadence beat can play over other audio, can be muted, and follows Pause and Resume. Fawnly never records microphone audio.</>],
  ["Lock Screen and Dynamic Island", <>On supported iPhones, an active recording can appear as a Live Activity with activity type, recording state, elapsed time, distance, and pace. It never stores route coordinates. Tap it to return to the recorder.</>],
  ["Saving and restoring with Apple Health", <>The optional Save activities setting writes only a completed workout and its recorded route—not steps, calories, or elevation. Restore from Apple Health can recover eligible Fawnly workouts and available routes. Restored recorder values never alter Home or History totals.</>],
  ["Activity route sharing", <>Plus subscribers can create a card with a normalized route silhouette. It excludes Apple Maps, coordinates, start and finish markers, home labels, and place names. Review the route shape before sharing.</>],
  ["Home Screen widgets", <>Small and medium iPhone widgets show the latest local snapshot written after Fawnly refreshes Apple Health. If a widget asks you to open Fawnly, launch the app and let the refresh finish. WidgetKit controls update timing.</>],
  ["Fawnly Plus", <>Plus unlocks premium themes, custom hero fonts, Month and Year history, older periods, distance-first Home, Week and Month share cards, Paced Walk, Hike, Run, route sharing, and an optional weekly recap. Restore purchases from the Plus screen; manage or cancel in your Apple ID subscriptions.</>],
  ["Android step counting", <>On Android, Fawnly reads activity from Health Connect when available and permitted; otherwise it counts live steps using the device step sensor while the app is open. Android distance and calories may be estimates.</>],
  ["Notifications", <>The daily reminder and Plus weekly recap are optional. Fawnly asks for notification permission only when you enable a reminder. If notifications are disabled, enable them in device settings and turn the reminder on again.</>],
  ["Units and daily goal", <>Choose kilometres or miles in Settings. You can also turn the daily step goal on or off and adjust its amount at any time.</>],
  ["Clearing or resetting data", <>Fawnly stores activity history, recorded sessions, routes, widget snapshots, and settings locally. You can delete individual activities. Deleting a local activity does not remove a workout already saved to Apple Health.</>],
];

export default function Support() {
  return (
    <main className="page"><div className="wrap">
      <div className="page-head support-head"><span className="eyebrow">We’re here to help</span><h1 className="display">Fawnly Support</h1><p>Fawnly is a calm, local-first companion for Apple Health activity, outdoor recording, private routes, widgets, goals, and history.</p><div className="support-contact"><span>Contact</span><a href="mailto:fawnlyapp@outlook.com">fawnlyapp@outlook.com</a></div></div>
      <div className="support-list">{supportSections.map(([title, body]) => <section className="card support-card" key={title as string}><h2>{title}</h2><p>{body}</p></section>)}</div>
      <section className="card support-card support-privacy"><h2>Privacy and medical notice</h2><p>Fawnly requires no account. Apple Health data, recorded activities, routes, and widget snapshots stay on your device and are not sent to a Fawnly server. There are no ads, third-party analytics, or cross-app tracking. RevenueCat manages Plus and never receives health, activity, or route data. Fawnly is not a medical device and does not provide medical advice.</p><div className="inline-links"><a href="/privacy">Privacy Policy ↗</a><a href="/terms">Terms of Use ↗</a></div></section>
    </div></main>
  );
}
