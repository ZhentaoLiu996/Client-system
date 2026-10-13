/**
 * 角色切换：Teaching Staff vs Education Team
 */
function switchRole(role) {
  const staffBtn = document.getElementById('roleBtnStaff');
  const teamBtn = document.getElementById('roleBtnTeam');
  const staffPills = document.getElementById('staffNavPills');
  const teamPills = document.getElementById('teamNavPills');

  if (role === 'staff') {
    staffBtn.classList.add('active');
    teamBtn.classList.remove('active');
    staffPills.style.display = 'flex';
    teamPills.style.display = 'none';
    goToStep('survey-welcome');
  } else {
    teamBtn.classList.add('active');
    staffBtn.classList.remove('active');
    teamPills.style.display = 'flex';
    staffPills.style.display = 'none';
    goToStep('team-overview');
  }
}

/**
 * 跨模块导航
 */
function goToStep(sectionId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(sectionId);
  if (targetSec) targetSec.classList.add('active');

  document.querySelectorAll('.step-btn').forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionId)) {
      btn.classList.add('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 如果切到了团队页面，延迟渲染/重算图表
  if (sectionId.startsWith('team-')) {
    setTimeout(initCharts, 80);
  }
}

/**
 * Education Team 登录
 */
function handleTeamLogin(e) {
  e.preventDefault();
  alert("Authenticated successfully as Education Team member!");
  goToStep('team-overview');
}

/**
 * Team 表格筛选与搜索
 */
function filterTableTeam() {
  const searchTxt = document.getElementById('searchInput').value.toLowerCase();
  const faculty = document.getElementById('facultyFilter').value;
  const support = document.getElementById('supportFilter').value;
  const rows = document.querySelectorAll('#tableTeam tbody tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const matchSearch = text.includes(searchTxt);
    const matchFaculty = faculty === "All" || text.includes(faculty.toLowerCase());
    const matchSupport = support === "All" || 
      (support === "Yes" && row.children[3].innerText.includes("Requested")) ||
      (support === "No" && row.children[3].innerText.includes("No assistance"));

    row.style.display = (matchSearch && matchFaculty && matchSupport) ? '' : 'none';
  });
}

function resetFilterTeam() {
  document.getElementById('searchInput').value = '';
  document.getElementById('facultyFilter').value = 'All';
  document.getElementById('supportFilter').value = 'All';
  filterTableTeam();
}

/**
 * 查看课程反思详情
 */
function viewCourseDetails(code, name, faculty) {
  document.getElementById('detailCourseCode').innerText = code;
  document.getElementById('detailCourseName').innerText = name;
  document.getElementById('detailFaculty').innerText = faculty;

  let quote = "";
  if (code.includes('COMP 1003')) {
    quote = '"In COMP 1003 (Structured Data), we want to incorporate First Nations technologies into case studies, but need guidance on culturally appropriate resource repositories."';
  } else if (code.includes('INFO 1012')) {
    quote = '"In INFO 1012 (IT Systems), students analyze requirement gathering. We need advice on integrating Indigenous Data Sovereignty."';
  } else if (code.includes('STAT 1000')) {
    quote = '"In STAT 1000 (Data Skills), we explore Australian demographic datasets and want to ensure our exercises follow AIATSIS ethical guidelines."';
  } else {
    quote = '"In INFO 1016 (Security Foundation), we explore cyber governance and data protection with ethical protocols."';
  }

  document.getElementById('detailReflection').innerText = quote;
  goToStep('team-details');
}

/**
 * 导出提示
 */
function triggerDownload() {
  const isPdf = document.getElementById('fmtPdf').checked;
  const fileType = isPdf ? "Executive_Summary_Report.pdf" : "Full_Audit_Data.xlsx";
  alert(`Exporting ${fileType} for First Nations Portfolio... Download Complete!`);
}

/**
 * Chart.js 图表渲染
 */
let chartsDone = false;

function initCharts() {
  if (chartsDone) return;

  // Overview 环形图
  const ctxGauge = document.getElementById('gaugeChart2');
  if (ctxGauge) {
    new Chart(ctxGauge, {
      type: 'doughnut',
      data: {
        datasets: [{ 
          data: [67, 33], 
          backgroundColor: ['#002b49', '#e5e7eb'], 
          borderWidth: 0 
        }]
      },
      options: { cutout: '75%', plugins: { tooltip: { enabled: false } } }
    });
  }

  // 月度趋势
  const ctxTrend = document.getElementById('trendChart2');
  if (ctxTrend) {
    new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: ['Feb', 'Mar W1', 'Mar W3', 'Apr W1', 'Apr W3'],
        datasets: [{ 
          label: 'Submissions', 
          data: [8, 18, 29, 39, 48], 
          borderColor: '#002b49', 
          backgroundColor: 'rgba(0, 43, 73, 0.05)',
          fill: true, 
          tension: 0.3 
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // 需求分布
  const ctxBar = document.getElementById('barChart2');
  if (ctxBar) {
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Curriculum Content', 'Culturally Safe Practice', 'Resources & Materials', 'Assessment Design', 'Community Connection'],
        datasets: [{ 
          data: [8, 6, 5, 4, 3], 
          backgroundColor: '#2c4c38', 
          borderRadius: 4 
        }]
      },
      options: { 
        indexAxis: 'y',
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } } 
      }
    });
  }

  // 需求排名
  const ctxRank = document.getElementById('supportRankChart7');
  if (ctxRank) {
    new Chart(ctxRank, {
      type: 'bar',
      data: {
        labels: ['Guidance & Resources', 'Teaching Strategies', 'Examples of Best Practice', 'Community Connections', 'Other'],
        datasets: [{ 
          data: [18, 15, 12, 9, 2], 
          backgroundColor: '#002b49', 
          borderRadius: 4 
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } } 
      }
    });
  }

  // 多学期趋势
  const ctxConf = document.getElementById('confidenceMultiSemChart9');
  if (ctxConf) {
    new Chart(ctxConf, {
      type: 'line',
      data: {
        labels: ['Sem 2', 'Sem 3', 'Sem 4', 'Sem 1 (2026)'],
        datasets: [{
          label: 'Confidence Trend',
          data: [3.1, 3.4, 3.7, 3.9],
          borderColor: '#2c4c38',
          backgroundColor: 'rgba(44, 76, 56, 0.1)',
          fill: true,
          tension: 0.35,
          pointRadius: 5
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        scales: { y: { min: 0, max: 4 } } 
      }
    });
  }

  chartsDone = true;
}