---
title: Thank You - Velda
meta:
  - name: description
    content: Thank you for your GPU capacity reservation request
  - name: robots
    content: noindex
sidebar: false
outline: false
layout: page
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Optional: redirect to home after 5 seconds
  // setTimeout(() => window.location.href = '/', 5000)
})
</script>

<style scoped>
.thank-you-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 100px 32px;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  font-weight: bold;
}

.thank-you-container h1 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.thank-you-container p {
  font-size: 18px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.cta-button.primary {
  background: #111111;
  color: white;
  box-shadow: 0 6px 18px rgba(17, 17, 17, 0.15);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #111111;
  border: 1px solid rgba(17, 17, 17, 0.12);
}

.cta-button:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

@media (max-width: 768px) {
  .thank-you-container {
    padding: 60px 24px;
  }

  .thank-you-container h1 {
    font-size: 32px;
  }

  .thank-you-container p {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}
</style>

<div class="thank-you-container">
  <div class="success-icon">✓</div>
  <h1>Thank You!</h1>
  <p>
    We've received your GPU capacity reservation request and will get back to you within 24 hours.
    Our team will review your requirements and reach out with next steps.
  </p>
  <div class="cta-buttons">
    <a href="https://calendly.com/velda-io/30min" target="_blank" rel="noopener" class="cta-button primary">
      Book a Meeting Now
    </a>
    <a href="/" class="cta-button secondary">
      Back to Home
    </a>
  </div>
</div>
