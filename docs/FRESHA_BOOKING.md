# Treatment booking links

Verified in the public Fresha interface on 22 October 2026. The Book button on
each service detail page opens the booking flow with one appointment selected.
The shared configuration is `js/data/services/booking.js`.

| Website treatment | Selected Fresha appointment | Variation ID |
| --- | --- | --- |
| Pregnancy Massage & Circulation Support | Pregnancy Care | 26998157 |
| Recovery & Core Restoration | Postpartum Recovery | 24481861 |
| Postnatal Lymphatic Drainage | Postpartum Recovery | 24481861 |
| Post-Surgical Recovery | Pre & Post-Surgical Recovery · 60 min | 29617756 |
| Advanced Lymphatic Therapy | Advanced Lymphatic Therapy · 60 min | 29617377 |
| Lipedema & Inflammatory Leg Care | Lymphatic Clinical Management · 60 min | 26068782 |
| TMJ, Jaw & Headache Treatment | TMJ Therapy – Jaw, Neck & Headache Relief | 24480917 |
| Chronic Pain, Stress & Inflammation | Myofascial Pain, Stress & Tension Recovery · 60 min | 25827155 |
| Clinical Therapeutic Massage & Injury Recovery | Remedial Massage · Integrated Clinical Bodywork · 60 min | 29742779 |
| Endometriosis & Pelvic Pain Support | Pelvic & Abdominal Therapy | 26131923 |
| Clinical Cellulite Remodelling | Cellulite & Tissue Remodelling | 29617957 |
| Lymphatic Reset & Fluid Retention Treatment (legacy detail URL) | Advanced Lymphatic Therapy · 60 min | 29617377 |

Postpartum Recovery explicitly includes postnatal lymphatic drainage, abdominal
wall/diastasis assessment and deep-core rehabilitation. The two website pages
therefore intentionally share this appointment. The legacy Lymphatic Reset page
uses the same swelling/fluid-retention appointment as Advanced Lymphatic Therapy.
The mapping follows the scope described in Fresha; website and Fresha names are
not necessarily identical.

Fresha describes Lymphatic Clinical Management as ongoing care for established
patients and directs new patients to Initial Assessment & Treatment first.
The clinic's separate Start Here assessment option remains available.

Fresha currently shows a 70-minute duration for Cellulite & Tissue Remodelling,
although its displayed title ends with “60 mi”. No website duration is changed.

Use the public booking URL with `offerItems=sv%3A<variation ID>&pId=2642624`.
Do not persist a session-specific `cartId`. The navbar and speciality overview
CTAs retain their existing category links; Related treatment cards continue to
open internal detail pages.
