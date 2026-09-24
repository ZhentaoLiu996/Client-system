/**
 * Navigation logic across Step 1 to Step 7
 * Switches active class between sections and nav pills
 */
function goToStep(stepNumber) {
  // Hide all sections and remove active styles from nav pills
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('active'));

  // Activate selected section
  const targetSec = document.getElementById(`step${stepNumber}`);
  if (targetSec) targetSec.classList.add('active');

  // Activate matching navigation button
  const targetBtn = document.querySelectorAll('.step-btn')[stepNumber - 1];
  if (targetBtn) targetBtn.classList.add('active');

  // Scroll viewport smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render or resize charts after DOM update
  setTimeout(initActivePageCharts, 100);
}

/**
 * Handle form submission for Step 1 Login
 */
function handleLogin(e) {
  e.preventDefault();
  alert("Authenticated successfully as Education Team member!");
  goToStep(2); // Automatically navigate to Step 2 Overview upon login
}

/**
 * Step 3: Real-time search and filter logic
 */
function filterTable3() {
  const searchTxt = document.getElementById('searchInput').value.toLowerCase();
  const faculty = document.getElementById('facultyFilter').value;
  const support = document.getElementById('supportFilter').value;
  const rows = document.querySelectorAll('#tableStep3 tbody tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    const matchSearch = text.includes(searchTxt);
    const matchFaculty = faculty === "All" || row.children[3].innerText.includes(faculty);
    const matchSupport = support === "All" || 
      (support === "Yes" && row.children[4].innerText.includes("Required")) ||
      (support === "No" && row.children[4].innerText.includes("No Support"));

    row.style.display = (matchSearch && matchFaculty && matchSupport) ? '' : 'none';
  });
}

/**
 * Step 3: Reset filter controls
 */
function resetFilter3() {
  document.getElementById('searchInput').value = '';
  document.getElementById('facultyFilter').value = 'All';
  document.getElementById('supportFilter').value = 'All';
  filterTable3();
}

/**
 * Navigate from Step 3 row item directly into Step 4 Details
 */
function viewCourseDetails(code, name, faculty) {
  document.getElementById('detailCourseCode').innerText = code;
  document.getElementById('detailCourseName').innerText = name;
  document.getElementById('detailFaculty').innerText = faculty;

  // Populate contextual reflection quote based on selected course
  let reflectionText = "";
  if (code === 'COMP 1015') {
    reflectionText = '"In COMP 1015 (Computing Innovation), we want to incorporate First Nations technologies into lecture case studies, but need guidance on culturally appropriate resource repositories."';
  } else if (code === 'INFO 1013') {
    reflectionText = '"In INFO 1013 (System Requirement), students analyze requirements for diverse stakeholders. We need advice on integrating Indigenous Data Sovereignty principles into our assignment specifications."';
  } else if (code === 'STAT 1000') {
    reflectionText = '"In STAT 1000 (Data Skill), we are exploring Australian demographic datasets and want to ensure our statistical exercises follow AIATSIS ethical guidelines."';
  } else {
    reflectionText = '"In INFO 1016 (Security Foundation), we explore cyber governance and data protection with ethical protocols."';
  }

  document.getElementById('detailReflection').innerText = reflectionText;
  goToStep(4);
}

/**
 * Step 6: Trigger report download alert
 */
function triggerDownload() {
  const isPdf = document.getElementById('fmtPdf').checked;
  const fileType = isPdf ? "Executive_Summary_Report.pdf" : "Full_Audit_Data.xlsx";
  alert(`Exporting ${fileType} for First Nations Portfolio... Download Complete!`);
}

/**
 * Chart.js Visualizations Initialization
 */
let chartsInitialized = false;

function initActivePageCharts() {
  if (chartsInitialized) return;

  // Step 2: Completion gauge doughnut chart (67%)
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
      options: { 
        cutout: '75%', 
        plugins: { tooltip: { enabled: false } } 
      }
    });
  }

  // Step 2: Submission trends line chart
  const ctxTrend2 = document.getElementById('trendChart2');
  if (ctxTrend2) {
    new Chart(ctxTrend2, {
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

  // Step 2: Support needs distribution bar chart
  const ctxBar2 = document.getElementById('barChart2');
  if (ctxBar2) {
    new Chart(ctxBar2, {
      type: 'bar',
      data: {
        labels: ['Curriculum', 'Safe Practice', 'Resources', 'Assessment', 'Community'],
        datasets: [{ 
          data: [8, 6, 5, 4, 3], 
          backgroundColor: '#2c4c38', 
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

  // Step 5: Support needs ranked horizontal bar chart
  const ctxRank5 = document.getElementById('supportRankChart5');
  if (ctxRank5) {
    new Chart(ctxRank5, {
      type: 'bar',
      data: {
        labels: ['Guidance/Resources', 'Teaching Strategies', 'Examples of Best Practice', 'Community Connections', 'Other'],
        datasets: [{ 
          data: [18, 15, 12, 9, 6], 
          backgroundColor: '#002b49', 
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

  // Step 6: Preview trend bar chart
  const ctxPrev6 = document.getElementById('previewTrendChart');
  if (ctxPrev6) {
    new Chart(ctxPrev6, {
      type: 'bar',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ 
          data: [45, 78, 110, 135, 152], 
          backgroundColor: '#002b49', 
          borderRadius: 3 
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } } 
      }
    });
  }

  // Step 7: Multi-semester confidence trend line chart
  const ctxConf7 = document.getElementById('confidenceMultiSemChart');
  if (ctxConf7) {
    new Chart(ctxConf7, {
      type: 'line',
      data: {
        labels: ['Sem 1 (2025)', 'Sem 2 (2025)', 'Sem 3', 'Sem 4', 'Sem 1 (2026)'],
        datasets: [{
          label: 'Average Confidence (Out of 5.0)',
          data: [2.8, 3.1, 3.4, 3.7, 3.9],
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
        scales: { y: { min: 1, max: 5 } } 
      }
    });
  }

  chartsInitialized = true;
}

// Initialize charts once window finishes loading
window.addEventListener('load', () => {
  initActivePageCharts();
});