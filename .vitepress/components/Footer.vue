<template>
  <footer class="velda-footer">
    <div class="footer-container">
      <div class="footer-columns">
        <!-- Column 1: Company & Contact -->
        <div class="footer-column">
          <h3 class="footer-title">Company</h3>
          <ul class="footer-links">
            <li><a href="/contact">
              <Icon icon="tabler:info-circle" class="footer-icon" />
              About Us
            </a></li>
            <li><a href="/privacy">
              <Icon icon="tabler:shield-check" class="footer-icon" />
              Privacy Notice
            </a></li>
            <li><a href="/eula">
              <Icon icon="tabler:file-text" class="footer-icon" />
              Terms of Service
            </a></li>
            <li><a href="/security">
              <Icon icon="tabler:shield-lock" class="footer-icon" />
              Security Notice
            </a></li>
          </ul>
        </div>

        <!-- Column 2: Resources -->
        <div class="footer-column">
          <h3 class="footer-title">Resources</h3>
          <ul class="footer-links">
            <li><a href="/comparison">
              <Icon icon="tabler:currency-dollar" class="footer-icon" />
              Plans & Pricing
            </a></li>
            <li><a href="/blog/">
              <Icon icon="tabler:article" class="footer-icon" />
              Blog
            </a></li>
            <li><a href="/intro">
              <Icon icon="tabler:book" class="footer-icon" />
              Documentation
            </a></li>
            <li><a href="/comparison">
              <Icon icon="tabler:rocket" class="footer-icon" />
              Getting Started
            </a></li>
            <li><a href="/run">
              <Icon icon="tabler:play" class="footer-icon" />
              Run Workloads
            </a></li>
          </ul>
        </div>

        <!-- Column 3: Connect -->
        <div class="footer-column">
          <h3 class="footer-title">Connect</h3>
          <ul class="footer-links">
            <li><a href="https://calendly.com/velda-io" target="_blank" rel="noopener">
              <Icon icon="tabler:calendar" class="footer-icon" />
              Schedule a Call
            </a></li>
            <li><a href="mailto:contact@velda.io">
              <Icon icon="tabler:mail" class="footer-icon" />
              Email Contact
            </a></li>
            <li><a href="https://github.com/velda-io/velda" target="_blank" rel="noopener">
              <Icon icon="tabler:brand-github" class="footer-icon" />
              GitHub
            </a></li>
            <li><a href="https://www.linkedin.com/company/velda-io/" target="_blank" rel="noopener">
              <Icon icon="tabler:brand-linkedin" class="footer-icon" />
              LinkedIn
            </a></li>
            <li><a href="https://x.com/velda_io" target="_blank" rel="noopener">
              <Icon icon="tabler:brand-x" class="footer-icon" />
              Twitter/X
            </a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="footer-logo-section">
            <img src="/logos.png" alt="Velda" class="footer-logo" />
            <span class="footer-tagline">Cloud development that actually feels local</span>
          </div>
          <div class="footer-legal">
            <span>&copy; {{ currentYear }} Velda. All rights reserved.</span>
            <div class="footer-legal-links">
              <a href="/privacy">Privacy Notice</a>
              <span>•</span>
              <a href="/eula">Terms of Service</a>
              <span>•</span>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.velda-footer {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 4rem;
  width: 100%;
  position: relative;
  z-index: 30;
  clear: both;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .footer-columns {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-family: 'Oswald', Arial, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-links a:hover {
  color: var(--vp-c-brand-1);
}

.footer-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .footer-logo-section {
    flex-direction: row;
    gap: 1rem;
  }
}

.footer-logo {
  height: 32px;
  width: auto;
}

.footer-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-style: italic;
}

.footer-legal {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .footer-legal {
    align-items: flex-end;
  }
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
}

.footer-legal-links a {
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal-links a:hover {
  color: var(--vp-c-brand-1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-title {
    font-size: 1rem;
  }
}
</style>
