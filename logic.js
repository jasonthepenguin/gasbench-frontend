// Load and display leaderboard data
async function loadLeaderboard() {
  try {
    const response = await fetch('results.json');
    const data = await response.json();
    
    // Get the leaderboard container
    const lbList = document.querySelector('.lb-list');
    if (!lbList) return;
    
    // Clear existing items
    lbList.innerHTML = '';
    
    // Create leaderboard items
    data.leaderboard.forEach(item => {
      const li = document.createElement('li');
      li.className = 'lb-item';
      
      // Calculate non-failing percentage
      const nonFailingPercentage = ((item.successful_actions / item.total_actions) * 100).toFixed(1);
      
      // Extract model display name (simplify the names)
      const modelName = item.model
        .replace('anthropic/', '')
        .replace('openai/', '')
        .replace('claude-', '')
        .replace('-latest', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      li.innerHTML = `
        <div class="lb-rank" aria-label="Rank ${item.rank}"><span>#${item.rank}</span></div>
        <div class="lb-main">
          <div class="lb-title">
            <span class="lb-name">${modelName}</span>
          </div>
          <div class="lb-metrics">
            <span class="metric"><label>API calls</label><strong>${item.total_api_calls_all_phases}</strong></span>
            <span class="metric"><label>Non-failing</label><strong>${nonFailingPercentage}%</strong></span>
          </div>
        </div>
      `;
      
      lbList.appendChild(li);
    });
    
  } catch (error) {
    console.error('Error loading leaderboard data:', error);
  }
}

// Load leaderboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadLeaderboard();
  
  // Set current year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
