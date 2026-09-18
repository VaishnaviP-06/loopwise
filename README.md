# LoopWise ♻️

### AI-Powered Circular Resource Advisor

LoopWise is a sustainability-focused web application that helps users decide what to do with an item before throwing it away or replacing it.

Instead of immediately treating an unwanted item as waste, LoopWise uses AI to explore whether it can be **repaired, reused, repurposed, donated, or recycled**.

---

## 🌱 Problem

Many usable products are discarded because people are unsure what they can do with them.

An old chair may only need a small repair.  
An unused device may be suitable for donation.  
A piece of furniture may have another useful purpose instead of becoming waste.

This lack of awareness can lead to unnecessary disposal and replacement.

---

## 💡 Solution

LoopWise acts as an **AI-powered circular resource advisor**.

Users can:

1. Upload an image of an item
2. Provide optional details such as condition, age, material, and context
3. Ask LoopWise to analyze the item
4. Receive a suggested circular pathway
5. Understand why that option was recommended
6. Explore a possible second-life use

The system considers five possible pathways:

**Repair · Reuse · Repurpose · Donate · Recycle**

---

## 🤖 How AI Is Used

LoopWise uses **multimodal AI** to combine visual information from an uploaded image with user-provided context.

The AI helps with:

- Understanding the visible characteristics of an item
- Considering its reported condition and context
- Recommending a suitable circular pathway
- Explaining the reasoning behind the recommendation
- Suggesting a possible second-life use
- Providing a confidence level and safety guidance

The goal is not simply to identify an object, but to support a **better decision about what to do with it next**.

---

## 🔄 Example

**Input:**  
An old wooden chair with minor damage.

**Possible AI recommendation:**  
**Repair + Reuse**

**Reason:**  
The chair appears potentially usable, and the reported damage may be repairable.

**Second-life idea:**  
Convert it into a student workspace chair after checking its structural condition.

The final decision remains with the user, especially when physical inspection is required.

---

## 🌍 Sustainability Impact

LoopWise encourages a **reuse-before-replacement mindset**.

By helping users consider alternatives to disposal, the project aims to support:

- Reduced unnecessary waste
- Longer product lifecycles
- Increased reuse and repair
- Better awareness of circular practices
- More informed disposal decisions

### SDG 12 — Responsible Consumption and Production

LoopWise primarily aligns with **UN Sustainable Development Goal 12**, which focuses on responsible consumption and production patterns.

---

## 🛡️ Responsible AI

LoopWise is designed as **AI-assisted decision support**, not a professional inspection system.

Important limitations include:

- An image cannot reveal hidden structural damage.
- Electrical or mechanical safety cannot always be determined visually.
- Hazardous or damaged items may require professional assessment.
- AI recommendations may be uncertain or incorrect.
- Users should verify safety before repairing, reusing, donating, or repurposing an item.

The application also avoids requiring unnecessary personal information from users.

---

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Google Gemini API**
- **Multimodal AI**

---

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/VaishnaviP-06/loopwise.git
cd loopwise
npm install
