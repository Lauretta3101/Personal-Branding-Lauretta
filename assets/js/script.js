window.addEventListener('load', () => {
  document.querySelectorAll('.sbar-fill').forEach(el => {
    el.style.width = (el.dataset.w || 0) + '%';
  });

  // INTRO FIX
  const intro = document.getElementById('intro-overlay');

  if (intro) {
    setTimeout(() => {
      intro.style.opacity = '0';
      intro.style.pointerEvents = 'none';

      setTimeout(() => {
        intro.style.display = 'none';
      }, 500);
    }, 2000);
  }
});

// ===== PORTFOLIO FOLDER DATA =====
const folderData = {
  web: {
    name: 'Web Design',
    dot: '#2196f3',
    thumb: '#e3f2fd',
    btn: '#2196f3',
    projects: [
      { icon: '🌐', title: 'Personal Branding Website', desc: "Lauretta Josephine's personal portfolio website built with HTML & CSS, featuring a modern and responsive design.", link: 'https://drive.google.com' },
      { icon: '💻', title: 'School Website', desc: 'A school information website with a home page, profile, and activity gallery.', link: 'https://drive.google.com' }
    ]
  },
  design: {
    name: 'Graphic Design',
    dot: '#f06292',
    thumb: '#fce4ec',
    btn: '#e91e8c',
    projects: [
      { icon: '🎨', title: 'School Event Poster', desc: 'A poster design for the class meeting event, made with Canva.', link: 'https://drive.google.com' },
      { icon: '✏️', title: 'Bazaar Promotion Flyer', desc: 'A digital flyer design for the school bazaar event.', link: 'https://drive.google.com' }
    ]
  },
  presentation: {
    name: 'Presentation',
    dot: '#ffa726',
    thumb: '#fff3e0',
    btn: '#f57c00',
    projects: [
      { icon: '📊', title: 'PKK Presentation Slides', desc: 'Presentation material made with PowerPoint.', link: 'https://drive.google.com' }
    ]
  }
};

function openFolder(key) {
  const d = folderData[key];
  if (!d) return;

  document.getElementById('detailDot').style.background = d.dot;
  document.getElementById('detailName').textContent = d.name;

  document.getElementById('projectsList').innerHTML = d.projects.map(p => `
    <div class="project-row">
      <div class="project-thumb" style="background:${d.thumb}">
        <span style="font-size:26px">${p.icon}</span>
      </div>
      <div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <a class="project-link" href="${p.link}" target="_blank" style="background:${d.btn}">
          ↗ View on Drive
        </a>
      </div>
    </div>
  `).join('');

  document.getElementById('detailPanel').classList.add('open');
  document.getElementById('detailPanel').scrollIntoView({ behavior: 'smooth' });
}

function closeFolder() {
  document.getElementById('detailPanel').classList.remove('open');
}


// ===== NAVBAR ACTIVE =====
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });

  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + cur;
    a.classList.toggle('active', active);
    // On mobile the nav scrolls horizontally, so keep the active link visible
    if (active && a.scrollIntoView && window.innerWidth <= 768) {
      a.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


// ===== OVERLAY =====
function openOverlay(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}


// ===== EDUCATION PHOTOS =====
const ROT = ['-4deg', '3.5deg', '-2.5deg'];

const photos = {
  TK:  ['assets/images/tk1.jpeg', 'assets/images/tk2.jpeg'],
  SD:  ['assets/images/sd1.jpeg', 'assets/images/sd2.jpeg'],
  SMP: ['assets/images/smp1.jpeg', 'assets/images/smp2.jpeg'],
  SMK: ['assets/images/smk1.jpeg', 'assets/images/smk2.jpeg'],
};

// Photo captions (edit these to match your actual photos)
const captions = {
  TK:  ['Kindergarten Days', 'Kindergarten Memories'],
  SD:  ['Elementary School Days', 'Elementary School Memories'],
  SMP: ['Junior High Days', 'Junior High Memories'],
  SMK: ['Vocational High School Days', 'Vocational High School Memories'],
};

function openEduOverlay(level, school, year) {
  const row = document.getElementById('edu-polaroid-row');

  if (!row) {
    console.error('Container not found!');
    return;
  }

  document.getElementById('edu-overlay-label').textContent = `📷 gallery — ${year}`;
  document.getElementById('edu-overlay-title').textContent = `${level} Photos — ${school}`;

  row.innerHTML = '';

  if (!photos[level]) {
    console.error('Level not found:', level);
    return;
  }

  photos[level].forEach((src, i) => {
    const caption = (captions[level] && captions[level][i]) || '';
    row.innerHTML += `
      <div class="polaroid" style="--rot:${ROT[i % ROT.length]};--delay:${i * 0.08}s">
        <img src="${src}" alt="${caption}" style="width:180px;height:180px;object-fit:cover;">
        <div class="polaroid-caption">${caption}</div>
      </div>
    `;
  });

  openOverlay('edu-overlay');
}


// ===== OVERLAY CLOSE EVENTS =====
document.querySelectorAll('.photo-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) closeOverlay(el.id);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOverlay('family-overlay');
    closeOverlay('edu-overlay');
  }
});


// ===== OPEN FAMILY =====
function openFamily() {
  openOverlay('family-overlay');
}