from google import genai
from dotenv import load_dotenv
import os
import time

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# =========================
# Marketing Content
# =========================

def generate_marketing_content(
    business_name,
    business_type,
    location,
    content_type,
    prompt
):
    full_prompt = f"""
You are an expert digital marketing strategist for local businesses.

Business Name: {business_name}
Business Type: {business_type}
Location: {location}

Content Type:
{content_type}

Promotion / Offer:
{prompt}

Instructions:
- Write engaging and professional marketing content.
- Make it suitable for small and local businesses.
- Include a strong call-to-action.
- Generate 3-5 relevant hashtags.
- Keep the response concise (100-150 words max).
- Use emojis where appropriate.
- Return only the final marketing content.
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=full_prompt
            )

            return response.text

        except Exception as e:
            print(
                f"Attempt {attempt + 1} failed: {e}"
            )
            time.sleep(2)

    return (
        "Unable to generate content "
        "at the moment."
    )


# =========================
# Review Analysis
# =========================

def analyze_review(review_text):
    prompt = f"""
You are a customer review analysis expert.

Analyze this review:

{review_text}

Return ONLY in this format:

Sentiment:
Positive / Neutral / Negative

Strengths:
- point 1
- point 2

Improvements:
- point 1
- point 2

Overall Rating:
X/5
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(e)

        return (
            "Unable to analyze review."
        )


import json

def generate_poster_content(
    festival,
    offer,
    theme
):
    prompt = f"""
Create marketing poster text.

Festival: {festival}
Offer: {offer}
Theme: {theme}

Return ONLY valid JSON:

{{
  "headline": "...",
  "subheadline": "...",
  "cta": "..."
}}

Rules:
- Short and catchy
- Professional marketing tone
- CTA should encourage action
- No markdown
- No explanation
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return json.loads(response.text)

    except Exception as e:
        print(e)

        return {
            "headline": f"Happy {festival}! ✨",
            "subheadline": offer,
            "cta": "Visit Today"
        }