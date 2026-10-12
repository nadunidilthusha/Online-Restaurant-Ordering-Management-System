import React, { useState, useEffect } from 'react';
import * as contactApi from '../../../api/contactApi';
import SaveBar from '../../components/SaveBar';
import {
  Mail,
  Calendar,
  Search,
  Filter,
  Check,
  Trash2,
  Reply,
  Copy,
  Phone,
  Clock,
  Sparkles,
  Paperclip,
  Send,
  FileDown,
  Edit3,
  Eye,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import '../../../assets/styles/AdminContact.css';

const SEED_INQUIRIES = [
  // --- PAGE 1 (1 to 5) ---
  {
    id: 1,
    name: 'Hana Wijesinghe',
    initials: 'HW',
    avatarColor: 'burgundy',
    email: 'hana.w@gmail.com',
    phone: '+94 77 123 4567',
    category: 'Group Booking',
    categoryClass: 'group-booking',
    subject: 'Do you take group bookings for 12 people on Friday evening?',
    snippet: 'Do you take...',
    subSnippet: 'We are...',
    message:
      'Hello Amara & culinary team, we are planning an intimate 40th wedding anniversary dinner with 12 close family members on Friday at 7:30 PM. We would love the secluded veranda garden table if possible. Please confirm if customized set menus or wine pairing packages can be pre-arranged.',
    received: '10m ago',
    receivedTimestamp: '10 mins ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 2,
    name: 'Tom Mathews',
    initials: 'TM',
    avatarColor: 'dark',
    email: 'tom.m@outlook.com',
    phone: '+94 71 884 9021',
    category: 'Culinary Feedback',
    categoryClass: 'culinary-feedback',
    subject: 'Loved the sea bass, thank you so much!',
    snippet: 'Loved the sea...',
    subSnippet: 'Dined last...',
    message:
      'Dined last night at table 4. The fire-roasted sea bass with charred lemon and shaved fennel was simply extraordinary. Convey our heartfelt compliments to the open fire kitchen brigade.',
    received: '2h ago',
    receivedTimestamp: '2 hours ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 3,
    name: 'Priya Nair',
    initials: 'PN',
    avatarColor: 'gray',
    email: 'priya.nair@corp.com',
    phone: '+94 76 552 1904',
    category: 'Dietary Query',
    categoryClass: 'dietary-query',
    subject: 'Is the tasting menu available with vegan pairings?',
    snippet: 'Is the tasting...',
    subSnippet: 'Looking to...',
    message:
      'Looking to book a private salon table for 4 next Tuesday. Two of our guests follow a strict vegan diet. Could you please confirm if the 5-course tasting menu can be tailored completely plant-based alongside vegan-certified wines?',
    received: '5h ago',
    receivedTimestamp: '5 hours ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 4,
    name: 'Kasun Rajapaksa',
    initials: 'KR',
    avatarColor: 'olive',
    email: 'kasun.r@lk.biz',
    phone: '+94 77 900 3412',
    category: 'Catering Quote',
    categoryClass: 'catering-quote',
    subject: 'Please confirm customized catering quote for 40 guests',
    snippet: 'Please...',
    subSnippet: 'PDF proposal...',
    message:
      'We require a formal PDF proposal for our corporate celebration dinner in Colombo 07 on November 15th. Kindly include options for canapés, live botanical grill stations, and sommelier service.',
    received: '1d ago',
    receivedTimestamp: '1 day ago via Storefront Contact Form',
    status: 'Replied',
  },
  {
    id: 5,
    name: 'Sara Jayawardena',
    initials: 'SJ',
    avatarColor: 'gold',
    email: 'sara.j@yahoo.com',
    phone: '+94 70 334 1120',
    category: 'General Inquiry',
    categoryClass: 'general-inquiry',
    subject: 'Valet parking availability and cellar tour options',
    snippet: 'Valet parking...',
    subSnippet: 'Host...',
    message:
      'Host dining inquiry: Does Saffron & Fig offer complimentary valet parking during peak dinner hours? Also inquiring whether private cellar walk-throughs can be arranged beforehand.',
    received: '2d ago',
    receivedTimestamp: '2 days ago via Storefront Contact Form',
    status: 'Resolved',
  },

  // --- PAGE 2 (6 to 10) ---
  {
    id: 6,
    name: 'Dineth Silva',
    initials: 'DS',
    avatarColor: 'burgundy',
    email: 'dineth.s@gmail.com',
    phone: '+94 77 445 8899',
    category: 'Group Booking',
    categoryClass: 'group-booking',
    subject: 'Private Veranda booking for 16 pax next Sunday',
    snippet: 'Private Veranda...',
    subSnippet: 'Celebrating a...',
    message:
      'Celebrating a corporate promotion with 16 executives next Sunday afternoon at 1:00 PM. Could we reserve the secluded private veranda section and request a bespoke 4-course degustation menu?',
    received: '3d ago',
    receivedTimestamp: '3 days ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 7,
    name: 'Anuki Perera',
    initials: 'AP',
    avatarColor: 'olive',
    email: 'anuki.p@corp.lk',
    phone: '+94 71 223 9900',
    category: 'Catering Quote',
    categoryClass: 'catering-quote',
    subject: 'Inquiry for high-end cocktail reception menu',
    snippet: 'Inquiry for high...',
    subSnippet: 'Looking for ca...',
    message:
      'Looking for canapé selections, signature botanical mocktails, and live grill platters for an intimate gallery opening event in Colombo 03 on October 28th. Please share pricing tiers.',
    received: '3d ago',
    receivedTimestamp: '3 days ago via Storefront Contact Form',
    status: 'Replied',
  },
  {
    id: 8,
    name: 'Michael Fernando',
    initials: 'MF',
    avatarColor: 'dark',
    email: 'michael.f@outlook.com',
    phone: '+94 76 881 2345',
    category: 'Dietary Query',
    categoryClass: 'dietary-query',
    subject: 'Gluten allergy precautions for wood-fired dishes',
    snippet: 'Gluten allergy...',
    subSnippet: 'One of our gue...',
    message:
      'One of our guests has severe celiac disease. Can the kitchen brigade prepare gluten-free flatbreads and guarantee zero cross-contamination on the open wood-fired hearth?',
    received: '4d ago',
    receivedTimestamp: '4 days ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 9,
    name: 'Shanika De Silva',
    initials: 'SD',
    avatarColor: 'gold',
    email: 'shanika.des@yahoo.com',
    phone: '+94 70 554 1122',
    category: 'General Inquiry',
    categoryClass: 'general-inquiry',
    subject: 'Corkage policy and cellar wine list request',
    snippet: 'Corkage policy...',
    subSnippet: 'Inquiring if we...',
    message:
      'Inquiring if we may bring two vintage Burgundy bottles for our anniversary dinner, and what the applicable corkage fee per bottle would be. Also requesting the latest cellar reserve list.',
    received: '5d ago',
    receivedTimestamp: '5 days ago via Storefront Contact Form',
    status: 'Resolved',
  },
  {
    id: 10,
    name: 'Rumesh Alwis',
    initials: 'RA',
    avatarColor: 'gray',
    email: 'rumesh.alwis@gmail.com',
    phone: '+94 77 889 0011',
    category: 'Culinary Feedback',
    categoryClass: 'culinary-feedback',
    subject: 'Exceptional evening with the Chef Tasting menu',
    snippet: 'Exceptional eve...',
    subSnippet: 'The smoked lam...',
    message:
      'The smoked lamb rack and charred leek sourdough were absolute perfection. Thank you to Chef Amara and our sommelier for recommending the 2018 vintage. We will certainly return.',
    received: '5d ago',
    receivedTimestamp: '5 days ago via Storefront Contact Form',
    status: 'Resolved',
  },

  // --- PAGE 3 (11 to 15) ---
  {
    id: 11,
    name: 'Kaveen Senanayake',
    initials: 'KS',
    avatarColor: 'burgundy',
    email: 'kaveen.s@biz.lk',
    phone: '+94 77 334 7766',
    category: 'Group Booking',
    categoryClass: 'group-booking',
    subject: 'Corporate dinner reservation with presentation screen',
    snippet: 'Corporate dinner...',
    subSnippet: 'We require a qu...',
    message:
      'We require a quiet private salon table for 10 corporate partners with AV display or projector capabilities for a short 15-minute pre-dinner presentation on Friday November 3rd.',
    received: '6d ago',
    receivedTimestamp: '6 days ago via Storefront Contact Form',
    status: 'Unread',
  },
  {
    id: 12,
    name: 'Natasha Wickramasinghe',
    initials: 'NW',
    avatarColor: 'olive',
    email: 'natasha.w@gmail.com',
    phone: '+94 71 990 1234',
    category: 'Catering Quote',
    categoryClass: 'catering-quote',
    subject: 'Wedding rehearsal luncheon catering package',
    snippet: 'Wedding rehearsal...',
    subSnippet: 'Seeking a formal...',
    message:
      'Seeking a formal quotation for an outdoor afternoon luncheon for 25 guests. Interested in seasonal seafood displays, fire-roasted dishes, and artisan desserts at our private residence in Mount Lavinia.',
    received: '1w ago',
    receivedTimestamp: '1 week ago via Storefront Contact Form',
    status: 'Replied',
  },
  {
    id: 13,
    name: 'Imran Farook',
    initials: 'IF',
    avatarColor: 'dark',
    email: 'imran.f@fastmail.com',
    phone: '+94 76 112 4433',
    category: 'Dietary Query',
    categoryClass: 'dietary-query',
    subject: 'Halal certification and meat sourcing details',
    snippet: 'Halal certificat...',
    subSnippet: 'Kindly confirm if...',
    message:
      'Kindly confirm if all poultry and lamb served at Saffron & Fig are sourced from certified Halal suppliers, and whether alcohol is utilized in the reduction sauces.',
    received: '1w ago',
    receivedTimestamp: '1 week ago via Storefront Contact Form',
    status: 'Resolved',
  },
  {
    id: 14,
    name: 'Tharindu Bandara',
    initials: 'TB',
    avatarColor: 'gold',
    email: 'tharindu.b@gmail.com',
    phone: '+94 70 889 6677',
    category: 'Culinary Feedback',
    categoryClass: 'culinary-feedback',
    subject: 'Burrata salad and desserts praise',
    snippet: 'Burrata salad...',
    subSnippet: 'The fig and hon...',
    message:
      'The fig and honey pistachio dressing on the burrata salad was unmatched. The salted caramel tart completed an unforgettable anniversary dinner for my wife and me. Keep up the high standard!',
    received: '1w ago',
    receivedTimestamp: '1 week ago via Storefront Contact Form',
    status: 'Resolved',
  },
  {
    id: 15,
    name: 'Dilshan Mendis',
    initials: 'DM',
    avatarColor: 'gray',
    email: 'dilshan.m@lk.com',
    phone: '+94 77 554 3322',
    category: 'General Inquiry',
    categoryClass: 'general-inquiry',
    subject: 'Gift voucher purchase and dining experience cards',
    snippet: 'Gift voucher pur...',
    subSnippet: 'Can we purchase...',
    message:
      'Can we purchase customized dining vouchers with personalized tasting menu credits for our parents 50th golden anniversary? Looking to arrange a voucher valued at Rs. 40,000.',
    received: '2w ago',
    receivedTimestamp: '2 weeks ago via Storefront Contact Form',
    status: 'Resolved',
  },
];

export default function ContactManagementPage() {
  const [inquiries, setInquiries] = useState(SEED_INQUIRIES);
  const [selectedId, setSelectedId] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Draft reply per message
  const [draftReplies, setDraftReplies] = useState({
    1: 'Dear Hana,\n\nWe are delighted to confirm your group reservation request for Friday evening. Our host team has provisionally secured the secluded veranda table for 12 guests. Our head sommelier has also prepared an exclusive wine pairing selection for your anniversary celebration.\n\nPlease let us know if you have any dietary preferences.\n\nWarm regards,\nAmara Perera & Saffron & Fig Concierge',
    6: 'Dear Dineth,\n\nThank you for reaching out to Saffron & Fig. We would be honoured to host your executive corporate celebration on Sunday afternoon at 1:00 PM. Our private veranda section accommodates up to 18 guests comfortably. We have attached our bespoke 4-course degustation menu for your review.\n\nWarm regards,\nAmara Perera & Host Team',
    11: 'Dear Kaveen,\n\nThank you for considering Saffron & Fig for your corporate dinner. Our private dining salon table features discreet high-definition projection and display connectivity suitable for executive briefings. We look forward to confirming your booking.\n\nBest regards,\nAmara Perera & Saffron & Fig Concierge',
  });

  // Public contact information modal state
  const [publicDetails, setPublicDetails] = useState({
    phone: '+94 11 234 5678',
    email: 'concierge@saffronfig.com',
    address: '24 Galle Road, Colombo 03, Sri Lanka',
    hours: 'Mon-Sun: 11:00 AM – 11:00 PM',
    valet: 'Complimentary Valet at North Carriage Gate',
  });

  // Load backend contact inquiries on mount with sample fallback
  useEffect(() => {
    contactApi
      .getAll()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, idx) => ({
            id: item.id || idx + 1,
            name: item.name || 'Guest Patron',
            initials: (item.name || 'GP')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
            avatarColor: ['burgundy', 'dark', 'gray', 'olive', 'gold'][idx % 5],
            email: item.email || 'guest@example.com',
            phone: item.phone || '+94 77 000 0000',
            category: item.inquiryType || 'General Inquiry',
            categoryClass: 'general-inquiry',
            subject: item.subject || 'Storefront Inquiry',
            snippet: (item.subject || 'Inquiry').slice(0, 16) + '...',
            subSnippet: (item.message || '').slice(0, 12) + '...',
            message: item.message || 'No message provided',
            received: 'Just now',
            receivedTimestamp: 'Recent via Storefront Form',
            status: item.status || 'Unread',
          }));
          setInquiries(mapped);
          if (mapped[0]) setSelectedId(mapped[0].id);
        }
      })
      .catch(() => {
        // Fallback to sample inquiries
      });
  }, []);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredInquiries.length);
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  // Selected Inquiry (fallback to first item on current page or first overall)
  const selectedInquiry =
    inquiries.find((i) => i.id === selectedId) ||
    paginatedInquiries[0] ||
    inquiries[0] ||
    SEED_INQUIRIES[0];

  // Reset to page 1 when search or filter changes
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  // Page Switch Handler
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    // Auto-select the first item on that new page for a seamless experience
    const firstOnPage = filteredInquiries[(pageNum - 1) * itemsPerPage];
    if (firstOnPage) {
      setSelectedId(firstOnPage.id);
    }
  };

  // Counts for KPIs
  const totalInquiries = inquiries.length;
  const unreadCount = inquiries.filter((i) => i.status === 'Unread').length;
  const reservationCount = inquiries.filter((i) => i.category === 'Group Booking').length + 37;

  // Handle single check
  const handleToggleRow = (id, e) => {
    e.stopPropagation();
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Handle Select All on current page
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(paginatedInquiries.map((i) => i.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  // Copy email to clipboard
  const handleCopyEmail = () => {
    if (!selectedInquiry?.email) return;
    navigator.clipboard.writeText(selectedInquiry.email);
    setCopiedEmail(true);
    showNotification(`Copied ${selectedInquiry.email} to clipboard.`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Preset chip clicked
  const handleApplyPreset = (type) => {
    const name = selectedInquiry.name.split(' ')[0] || 'Patron';
    let text = '';

    if (type === 'booking') {
      text = `Dear ${name},\n\nWe are delighted to confirm your group reservation request for Friday evening. Our host team has provisionally secured the secluded veranda table for 12 guests. Our head sommelier has also prepared an exclusive wine pairing selection for your anniversary celebration.\n\nPlease let us know if you have any dietary preferences.\n\nWarm regards,\nAmara Perera & Saffron & Fig Concierge`;
    } else if (type === 'menu') {
      text = `Dear ${name},\n\nThank you for reaching out to Saffron & Fig. Please find attached our current seasonal five-course tasting menu and cellar selections. We take pride in sourcing all botanical produce from local partner farms across Sri Lanka.\n\nLooking forward to hosting you soon.\n\nWarm regards,\nAmara Perera & Culinary Team`;
    } else if (type === 'feedback') {
      text = `Dear ${name},\n\nThank you so much for your kind words! Our culinary brigade and front-of-house staff take immense pride in crafting memorable open-fire dining experiences. Your compliments have been shared with our kitchen team.\n\nWe hope to welcome you back to Saffron & Fig very soon.\n\nWith gratitude,\nAmara Perera & Saffron & Fig Team`;
    }

    setDraftReplies((prev) => ({ ...prev, [selectedInquiry.id]: text }));
    setIsDirty(true);
    showNotification(`Applied preset template for ${name}.`);
  };

  // Smart assist
  const handleSmartAssist = () => {
    const name = selectedInquiry.name.split(' ')[0] || 'Patron';
    const smartDraft = `Dear ${name},\n\nThank you for contacting Saffron & Fig. Regarding your query regarding "${selectedInquiry.subject}":\n\nOur team is pleased to accommodate your requirements with bespoke dining arrangements. We ensure every detail is tailored to the highest culinary standards.\n\nShould you need immediate assistance, please call our concierge directly at +94 11 234 5678.\n\nWarmest regards,\nAmara Perera\nExecutive Chef & Concierge`;
    setDraftReplies((prev) => ({ ...prev, [selectedInquiry.id]: smartDraft }));
    setIsDirty(true);
    showNotification('AI Smart Assist drafted a personalized response.');
  };

  // Send reply
  const handleSendReply = async () => {
    const replyText = draftReplies[selectedInquiry.id] || '';
    if (!replyText.trim()) {
      alert('Please compose a reply before sending.');
      return;
    }

    setInquiries((prev) =>
      prev.map((i) => (i.id === selectedInquiry.id ? { ...i, status: 'Replied' } : i))
    );
    contactApi.update(selectedInquiry.id, { status: 'Replied' }).catch(() => {});
    setIsDirty(false);
    showNotification(`Official response dispatched to ${selectedInquiry.email}`);
  };

  // Mark status toggle
  const handleToggleStatus = (id, e) => {
    e.stopPropagation();
    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Unread' ? 'Replied' : item.status === 'Replied' ? 'Resolved' : 'Unread';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    setIsDirty(true);
  };

  // Delete inquiry
  const handleDeleteInquiry = (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this message record?')) return;
    setInquiries((prev) => {
      const nextList = prev.filter((i) => i.id !== id);
      // If current page is now beyond the new total pages, step back
      const newTotal = Math.ceil(nextList.length / itemsPerPage) || 1;
      if (currentPage > newTotal) {
        setCurrentPage(newTotal);
      }
      return nextList;
    });
    contactApi.remove(id).catch(() => {});
    showNotification('Inquiry record deleted.');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Category', 'Subject', 'Status', 'Received'];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.name}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.category}"`,
      `"${i.subject.replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${i.received}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `saffron_fig_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Exported inquiry dataset as CSV.');
  };

  // Save changes
  const handleSaveAndPublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      showNotification('All inquiry status modifications and drafts saved.');
    }, 600);
  };

  const handleDiscardChanges = () => {
    setInquiries(SEED_INQUIRIES);
    setIsDirty(false);
    showNotification('Pending changes discarded.');
  };

  return (
    <div className="contact-mgmt-page">
      {/* Toast Notification */}
      {toast && (
        <div className="toast" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      {/* -------------------------------------------------------------
          Page Header
          ------------------------------------------------------------- */}
      <div className="contact-mgmt-head">
        <div className="contact-mgmt-title-group">
          <h1 className="contact-mgmt-title">Contact &amp; Inquiry Management</h1>
          <p className="contact-mgmt-sub">
            Review patron messages, orchestrate private banquet reservations, and synchronize public contact points for the storefront.
          </p>
        </div>

        <div className="contact-mgmt-top-actions">
          <button
            type="button"
            className="btn-admin-primary"
            onClick={() => setShowPublicModal(true)}
          >
            <Edit3 size={15} />
            Edit Public Details
          </button>
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={handleExportCSV}
          >
            <FileDown size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3 Stat KPI Cards Row
          ------------------------------------------------------------- */}
      <div className="contact-kpi-grid">
        {/* Card 1: Total Inquiries */}
        <div className="contact-kpi-card">
          <div className="contact-kpi-head">
            <span className="contact-kpi-label">TOTAL INQUIRIES</span>
            <div className="contact-kpi-icon-wrap">
              <Mail size={18} />
            </div>
          </div>
          <div className="contact-kpi-body">
            <span className="contact-kpi-num">{totalInquiries}</span>
            <span className="badge-trend-up">↑ +14% this wk</span>
          </div>
        </div>

        {/* Card 2: Unread Inquiries */}
        <div className="contact-kpi-card">
          <div className="contact-kpi-head">
            <span className="contact-kpi-label">UNREAD INQUIRIES</span>
            <span className="badge-action-needed">Action Needed</span>
          </div>
          <div className="contact-kpi-body">
            <span className="contact-kpi-num danger">{unreadCount}</span>
            <span className="contact-kpi-subtext">Require response</span>
          </div>
        </div>

        {/* Card 3: Reservation Requests */}
        <div className="contact-kpi-card">
          <div className="contact-kpi-head">
            <span className="contact-kpi-label">RESERVATION REQUESTS</span>
            <div className="contact-kpi-icon-wrap">
              <Calendar size={18} />
            </div>
          </div>
          <div className="contact-kpi-body">
            <span className="contact-kpi-num">{reservationCount}</span>
            <span className="contact-kpi-subtext">6 for this weekend</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Search & Filters Toolbar
          ------------------------------------------------------------- */}
      <div className="contact-toolbar">
        <div className="contact-search-box">
          <Search size={16} className="contact-search-icon" />
          <input
            type="search"
            className="contact-search-input"
            placeholder="Search by name, email, query..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="contact-toolbar-filters">
          <select
            className="contact-select-status"
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Unread">Status: Unread</option>
            <option value="Replied">Status: Replied</option>
            <option value="Resolved">Status: Resolved</option>
          </select>

          <button
            type="button"
            className="btn-icon-tool"
            title="Filter by date range"
            onClick={() => showNotification('Date filter calibrated to this month.')}
          >
            <Calendar size={16} />
          </button>

          <button
            type="button"
            className="btn-icon-tool"
            title="Sort inquiries"
            onClick={() => {
              setInquiries((prev) => [...prev].reverse());
              showNotification('Sorted inquiries order.');
            }}
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Main Workspace Grid (Table on Left, Selected Query on Right)
          ------------------------------------------------------------- */}
      <div className="contact-workspace-grid">
        {/* Left Column: Data Table */}
        <div className="contact-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th className="col-check">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        paginatedInquiries.length > 0 &&
                        paginatedInquiries.every((i) => selectedRowIds.includes(i.id))
                      }
                    />
                  </th>
                  <th>SENDER &amp; DETAILS</th>
                  <th>CATEGORY / SUBJECT</th>
                  <th>RECEIVED</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2.5rem', color: '#7a6e68' }}>
                      No inquiries match the current search or status filter.
                    </td>
                  </tr>
                ) : (
                  paginatedInquiries.map((item) => {
                    const isSelected = item.id === selectedId;
                    const isChecked = selectedRowIds.includes(item.id);

                    return (
                      <tr
                        key={item.id}
                        className={isSelected ? 'is-active-row' : ''}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <td className="col-check" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleToggleRow(item.id, e)}
                          />
                        </td>

                        <td>
                          <div className="sender-cell">
                            <div className={`sender-avatar ${item.avatarColor}`}>
                              {item.initials}
                            </div>
                            <div className="sender-meta">
                              <span className="sender-name">{item.name}</span>
                              <span className="sender-email">{item.email}</span>
                              {item.phone && <span className="sender-phone">{item.phone}</span>}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="category-cell">
                            <span className={`category-tag ${item.categoryClass}`}>
                              {item.category}
                            </span>
                            <span className="subject-snippet">{item.snippet}</span>
                            <span className="body-snippet">{item.subSnippet}</span>
                          </div>
                        </td>

                        <td>
                          <span className="time-cell">{item.received}</span>
                        </td>

                        <td>
                          <span
                            className={`status-pill ${item.status.toLowerCase()}`}
                            onClick={(e) => handleToggleStatus(item.id, e)}
                            title="Click to toggle status"
                            style={{ cursor: 'pointer' }}
                          >
                            {item.status === 'Unread' && <span className="dot" />}
                            {item.status === 'Replied' && <Reply size={11} />}
                            {item.status === 'Resolved' && <Check size={11} />}
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="row-actions-group">
                            <button
                              type="button"
                              className="btn-action-icon"
                              title="Compose reply"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(item.id);
                              }}
                            >
                              <Reply size={15} />
                            </button>
                            <button
                              type="button"
                              className="btn-action-icon"
                              title={item.status === 'Unread' ? 'Mark as Replied' : 'Mark as Unread'}
                              onClick={(e) => handleToggleStatus(item.id, e)}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              className="btn-action-icon danger"
                              title="Delete inquiry"
                              onClick={(e) => handleDeleteInquiry(item.id, e)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Fully Functional Pagination */}
          <div className="table-pagination-footer">
            <span>
              Showing {filteredInquiries.length === 0 ? 0 : startIndex + 1}–{endIndex} of {filteredInquiries.length} inquiries
            </span>
            <div className="pagination-controls">
              {/* Previous Page Button */}
              <button
                type="button"
                className="btn-page"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  opacity: currentPage === 1 ? 0.4 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
                title="Previous page"
              >
                &lt;
              </button>

              {/* Numbered Page Buttons (1, 2, 3...) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`btn-page ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                type="button"
                className="btn-page"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
                title="Next page"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Inbound Query Detail & Direct Reply */}
        <div className="contact-detail-card">
          <div className="detail-card-head">
            <span className="detail-meta-label">SELECTED INBOUND QUERY</span>
            <span className="detail-category-badge">{selectedInquiry.category}</span>
          </div>

          <h2 className="detail-sender-name">{selectedInquiry.name}</h2>

          {/* Contact Strip */}
          <div className="detail-info-strip">
            <div className="detail-info-row">
              <div className="detail-info-left">
                <Mail size={14} />
                <span>{selectedInquiry.email}</span>
              </div>
              <button
                type="button"
                className="btn-mini-action"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                {copiedEmail ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="detail-info-row">
              <div className="detail-info-left">
                <Phone size={14} />
                <span>{selectedInquiry.phone || '+94 77 123 4567'}</span>
              </div>
              <a
                href={`tel:${selectedInquiry.phone || '+94771234567'}`}
                className="btn-mini-action"
              >
                <Phone size={11} /> Call Now
              </a>
            </div>

            <div className="detail-info-row">
              <span className="detail-received-time">
                <Clock size={13} />
                Received: {selectedInquiry.receivedTimestamp}
              </span>
            </div>
          </div>

          {/* Message Content Section */}
          <div className="detail-message-section">
            <span className="detail-section-label">MESSAGE CONTENT</span>
            <div className="detail-message-box">
              <h3 className="detail-subject-line">&ldquo;{selectedInquiry.subject}&rdquo;</h3>
              <p className="detail-body-text">{selectedInquiry.message}</p>
            </div>
          </div>

          {/* Canned Response Presets */}
          <div className="canned-presets-wrap">
            <span className="detail-section-label">CANNED RESPONSE PRESETS</span>
            <div className="canned-chips-row">
              <button
                type="button"
                className="chip-preset"
                onClick={() => handleApplyPreset('booking')}
              >
                + Confirm Booking
              </button>
              <button
                type="button"
                className="chip-preset"
                onClick={() => handleApplyPreset('menu')}
              >
                + Send Menu
              </button>
              <button
                type="button"
                className="chip-preset"
                onClick={() => handleApplyPreset('feedback')}
              >
                + Acknowledge Feedback
              </button>
            </div>
          </div>

          {/* Direct Email Reply Box */}
          <div className="direct-reply-section">
            <div className="reply-header-row">
              <span className="detail-section-label" style={{ margin: 0 }}>
                DIRECT EMAIL REPLY
              </span>
              <button
                type="button"
                className="btn-smart-assist"
                onClick={handleSmartAssist}
              >
                <Sparkles size={13} />
                Smart Assist
              </button>
            </div>

            <textarea
              className="reply-textarea"
              rows="6"
              value={draftReplies[selectedInquiry.id] || ''}
              onChange={(e) => {
                const val = e.target.value;
                setDraftReplies((prev) => ({ ...prev, [selectedInquiry.id]: val }));
                setIsDirty(true);
              }}
              placeholder={`Write a thoughtful reply to ${selectedInquiry.name}...`}
            />

            <div className="reply-actions-row">
              <button
                type="button"
                className="btn-attachment"
                onClick={() => showNotification('Attachment modal: File uploaded successfully.')}
              >
                <Paperclip size={14} />
                Add Attachment
              </button>

              <button
                type="button"
                className="btn-send-reply"
                onClick={handleSendReply}
              >
                <Send size={14} />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          Modal: Edit Public Storefront Details
          ------------------------------------------------------------- */}
      {showPublicModal && (
        <div className="modal-backdrop" onClick={() => setShowPublicModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Edit Public Storefront Contacts</h3>
              <button
                type="button"
                className="modal-btn-close"
                onClick={() => setShowPublicModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div>
                <label className="lab">Concierge Phone Line</label>
                <input
                  type="text"
                  className="input"
                  value={publicDetails.phone}
                  onChange={(e) => setPublicDetails({ ...publicDetails, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="lab">Inquiries / Reservations Email</label>
                <input
                  type="email"
                  className="input"
                  value={publicDetails.email}
                  onChange={(e) => setPublicDetails({ ...publicDetails, email: e.target.value })}
                />
              </div>

              <div>
                <label className="lab">Physical Dining Address</label>
                <input
                  type="text"
                  className="input"
                  value={publicDetails.address}
                  onChange={(e) => setPublicDetails({ ...publicDetails, address: e.target.value })}
                />
              </div>

              <div>
                <label className="lab">Operating Hours Display</label>
                <input
                  type="text"
                  className="input"
                  value={publicDetails.hours}
                  onChange={(e) => setPublicDetails({ ...publicDetails, hours: e.target.value })}
                />
              </div>

              <div>
                <label className="lab">Valet &amp; Parking Instructions</label>
                <input
                  type="text"
                  className="input"
                  value={publicDetails.valet}
                  onChange={(e) => setPublicDetails({ ...publicDetails, valet: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-foot">
              <button
                type="button"
                className="btn-admin-secondary"
                onClick={() => setShowPublicModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-admin-primary"
                onClick={() => {
                  setShowPublicModal(false);
                  setIsDirty(true);
                  showNotification('Storefront public coordinates updated in working draft.');
                }}
              >
                Apply Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Bottom Unsaved Changes Sticky Bar
          ------------------------------------------------------------- */}
      <SaveBar
        dirty={isDirty}
        saving={isSaving}
        onSave={handleSaveAndPublish}
        onDiscard={handleDiscardChanges}
      />
    </div>
  );
}
