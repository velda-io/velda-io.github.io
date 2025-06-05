---
layout: page
title: Contact
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/5677755?s=400&u=e89905c3705b0743fa6f672791d1d5369e13743d&v=4',
    name: 'Chuan Qiu',
    title: 'Founder',
    links: [
      { icon: 'github', link: 'https://github.com/eagleonhill' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/chuanqiu/' },
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
        Velda is inspired by industry experts with over 10 years of experience in distributed systems and cloud computing.
        <br/>We're bootstrapped with sufficient funding to power your use cases.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
  <VPTeamPageTitle>
    <template #title>
      Contact us
    </template>
    <template #lead>
        <ul>
            <li>
                <a href="mailto:contact@velda.io">
                    📧 Email us at <strong>contact@velda.io</strong>
                </a>
            </li>
            <li>
                <a href="https://calendar.app.google/xJC6qMwzQ6UdAFVs5" target="_blank" rel="noopener">
                    📅 Book a <strong>free consultation</strong>
                </a>
            </li>
        </ul>
    </template>
  </VPTeamPageTitle>
</VPTeamPage>