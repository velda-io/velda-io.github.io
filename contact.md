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
      Velda is inspired by industrial experts with over 10 year experience on distributed system, cloud computing.
      It's boot-straped with sufficient funding to power your use-cases.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
  <VPTeamPageTitle>
    <template #title>
      Contact us
    </template>
    <template #lead>
      <p><a href="mailto:contact@velda.io">Email us</a></p>
      <a href="https://calendar.app.google/xJC6qMwzQ6UdAFVs5">Book a free consultation</a>
    </template>
  </VPTeamPageTitle>
</VPTeamPage>