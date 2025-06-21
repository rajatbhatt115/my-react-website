import React from 'react';
import BannerAdmin from '../components/Admin/BannerAdmin';
import AboutAdmin from '../components/Admin/AboutAdmin';
import TeamAdmin from '../components/Admin/TeamAdmin';
import FAQAdmin from '../components/Admin/FAQAdmin';
import AboutpageAboutAdmin from '../components/Admin/AboutpageAboutAdmin';
import AboutpageBannerAdmin from '../components/Admin/AboutpageBannerAdmin';
import ContactBannerAdmin from '../components/Admin/ContactBannerAdmin';
import ContactMessagesAdmin from '../components/Admin/ContactMessagesAdmin';

const AdminPanel = () => {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-blue-700">Admin Panel</h1>

      {/* 🔽 Banner Admin Section */}
      <BannerAdmin />

      {/* 🔽 About Admin Section */}
      <AboutAdmin />

      {/* 🔽 Team Admin Section */}
      <TeamAdmin />

      {/* 🔽 FAQ Admin Section */}
      <FAQAdmin />

      <AboutpageAboutAdmin />

      <AboutpageBannerAdmin />

      <ContactBannerAdmin />

      <ContactMessagesAdmin />
    </div>
  );
};

export default AdminPanel;
