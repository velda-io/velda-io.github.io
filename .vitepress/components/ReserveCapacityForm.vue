<template>
  <div
    aria-hidden="true"
    class="pointer-events-none -z-10 absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-[420px] bg-top bg-center bg-no-repeat"
    style="background-image: url('/bg-blog.svg'); background-size: cover; background-attachment: fixed;"
  ></div>
  <div class="reserve-capacity-container">
    <div class="form-header">
      <h1>Reserve GPU Capacity</h1>
      <p class="form-description">
        Reserve <strong>NVIDIA B300, GB300, H200, or H100 GPU capacity</strong> for your AI training and inference workloads.
        Fill out the form below, or
        <a href="https://calendly.com/velda-io/30min" target="_blank" rel="noopener" class="inline-link">book a meeting</a>
        directly with our team.
      </p>
      <p class="form-description">
        <strong>Get spot credits automatically</strong> for reserved compute you don't use. Flexible terms from 1 month to 5 years.
      </p>
      <p class="form-description">
        <a href="/b300-gpu-reservation" class="inline-link">Learn more about B300 Blackwell GPUs →</a>
      </p>
    </div>

    <form action="https://api.staticforms.xyz/submit" method="POST" class="reserve-form">
      <input type="hidden" name="accessKey" value="sf_89d42fe5e0f70920f2a7d4dc">
      <input type="hidden" name="subject" value="GPU Capacity Reservation Request">
      <input type="hidden" name="replyTo" value="$email">
      <input type="hidden" name="redirectTo" value="https://velda.io/reserve-thank-you">

      <div class="form-row">
        <div class="form-group">
          <label for="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your.email@company.com"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="company">Company *</label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Your company name"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="gpuModel">GPU Model *</label>
          <select id="gpuModel" name="GPU Model" required>
            <option value="">Select GPU model</option>
            <option value="A100">A100</option>
            <option value="H100">H100</option>
            <option value="H200">H200</option>
            <option value="B200">B200</option>
            <option value="B300">B300</option>
            <option value="GB300">GB300</option>
            <option value="VR200">Vera Rubin</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="gpuAmount">GPU Amount *</label>
          <select id="gpuAmount" name="GPU Amount" required>
            <option value="">Select quantity</option>
            <option value="<32">&lt;=32</option>
            <option value="64">64</option>
            <option value="128">128</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="1024">1,024</option>
            <option value="2048">2,048</option>
            <option value="4096">4,096</option>
            <option value=">=8192">&ge;=8,192</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="terms">Reservation Terms *</label>
          <select id="terms" name="Reservation Terms" required>
            <option value="">Select duration</option>
            <option value="1-month">1 Month</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
            <option value="12-months">12 Months</option>
            <option value="36-months">36 Months</option>
            <option value="60-months">60 Months</option>
            <option value="flexible">Flexible / On-Demand</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="details">Additional Details</label>
        <textarea
          id="details"
          name="Additional Details"
          rows="4"
          placeholder="Tell us about your use case, expected workload, timeline, or any specific requirements..."
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="cta-button primary">
          Reserve Capacity
        </button>
        <a href="https://calendly.com/velda-io/30min" target="_blank" rel="noopener" class="cta-button secondary">
          Book Meeting
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.reserve-capacity-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 32px 40px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
  padding-top: 60px;
}

.form-header h1 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.form-description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.625;
  max-width: 700px;
  margin: 0 auto;
}

.inline-link {
  color: #7b5cff;
  text-decoration: underline;
  font-weight: 500;
}

.inline-link:hover {
  color: #ff2da6;
}

.reserve-form {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 32px;
  border: 1px solid var(--vp-c-divider);
  max-width: 700px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 15px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #7b5cff;
}

.form-group textarea {
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.cta-button {
  flex: 1;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  .reserve-capacity-container {
    padding: 40px 20px 32px;
  }

  .form-header {
    padding-top: 40px;
    margin-bottom: 32px;
  }

  .form-header h1 {
    font-size: 32px;
    margin-bottom: 12px;
  }

  .form-description {
    font-size: 14px;
  }

  .reserve-form {
    padding: 24px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-actions {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}
</style>
