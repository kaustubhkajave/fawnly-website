import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing Fawnly, activity recording, widgets, route sharing, Apple Health features, and Fawnly Plus subscriptions.",
  alternates: { canonical: "https://getfawnly.com/terms/" },
  openGraph: { title: "Fawnly Terms of Use", description: "Terms for using Fawnly and Fawnly Plus.", url: "https://getfawnly.com/terms/" },
};

export default function Terms() {
  return (
    <main className="page"><article className="wrap legal-page prose">
      <span className="eyebrow">Fawnly legal</span>
      <h1 className="display legal-title">Terms of Use</h1>
      <p className="legal-updated">Last updated: July 22, 2026</p>
      <p>These Terms govern your use of the Fawnly app. By downloading or using Fawnly, you agree to these Terms. If you do not agree, please do not use the app.</p>

      <h2>License</h2>
      <p>We grant you a personal, non-transferable, non-exclusive license to use Fawnly on Apple-branded or Android devices that you own or control, in accordance with these Terms and the app store’s usage rules.</p>

      <h2>Fawnly Plus Subscriptions</h2>
      <p>Fawnly Plus is an optional auto-renewable subscription that unlocks premium themes, Month and Year history and older periods, distance-first Home and share cards, custom hero fonts, an optional weekly recap, premium activity types, and route-sharing cards. It is offered monthly and yearly, with localized pricing shown before purchase.</p>
      <p>Payment is charged to your Apple ID at confirmation. Subscriptions renew for the same period at the then-current price unless auto-renew is turned off at least 24 hours before the current period ends. Manage or cancel in your device Settings under Apple ID subscriptions. Deleting Fawnly does not cancel a subscription.</p>
      <p>Purchases are processed by Apple or Google and RevenueCat. Refunds, where applicable, are handled by the relevant app store under its policies.</p>

      <h2>Acceptable Use</h2>
      <p>You agree not to misuse Fawnly, including attempting to reverse engineer, resell, or interfere with the app except to the extent permitted by law.</p>

      <h2>Not Medical Advice</h2>
      <p>Fawnly is a general wellness and walking companion. It is not a medical device and does not provide medical advice, diagnosis, or treatment. If you have health concerns, talk with a qualified healthcare professional.</p>

      <h2>Health Data Availability</h2>
      <p>On iPhone, Fawnly depends on the Apple Health permissions you grant and the activity data available there. Step count, distance, active energy, or flights climbed may be unavailable when access is denied or Apple Health does not provide a value. Fawnly does not estimate missing Apple Health values.</p>

      <h2>Recorded Activities and Location</h2>
      <p>On supported iPhones, Fawnly can record outdoor Walk, Paced Walk, Hike, and Run activities using location services. GPS accuracy, distance, route shape, and pace may vary due to signal quality, surroundings, device settings, and interruptions. Background recording depends on available permissions and device capabilities.</p>
      <p>Recorded activities and precise routes stay local. If you enable Apple Health saving, Fawnly may save a completed workout and route, but not recorded steps, calories, or elevation. Deleting a local activity does not delete its Apple Health workout.</p>
      <p>A route share card uses a normalized silhouette without an Apple Maps background, raw coordinates, start or finish markers, home labels, or place names. A recognizable route shape may still reveal where you travelled. Review the card before sharing.</p>

      <h2>Widgets and Live Activities</h2>
      <p>Home Screen widgets display the latest local snapshot written by Fawnly and do not read Apple Health directly. iOS controls refresh timing. On supported iPhones, a recording may appear as a Live Activity; availability, presentation, and updates are controlled by iOS.</p>

      <h2>Safe Use</h2>
      <p>Use Fawnly only when safe. Stay aware of traffic, terrain, weather, local rules, and your physical limits. Do not interact with the app while driving or when device attention could create a hazard.</p>

      <h2>Disclaimer and Limitation of Liability</h2>
      <p>Fawnly is provided “as is” and “as available” without warranties of any kind, to the fullest extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from your use of the app. Nothing in these Terms limits rights that cannot legally be limited.</p>

      <h2>Changes to These Terms</h2>
      <p>We may update these Terms from time to time. Continued use after an update means you accept the revised Terms. The date above reflects the latest version.</p>

      <h2>Apple Standard EULA</h2>
      <p>Except where superseded by these Terms, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard Licensed Application End User License Agreement</a> also applies on iOS.</p>

      <h2>Contact</h2>
      <p>Questions can be sent to <a href="mailto:fawnlyapp@outlook.com">fawnlyapp@outlook.com</a>.</p>
      <div className="legal-links"><a href="/privacy">Privacy Policy</a><a href="/support">Support</a></div>
    </article></main>
  );
}
