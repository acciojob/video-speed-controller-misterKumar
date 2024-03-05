document.addEventListener('DOMContentLoaded', function () {
  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.toggle');
  const volume = player.querySelector('input[name="volume"]');
  const playbackSpeed = player.querySelector('input[name="playbackRate"]');
  const skipButtons = player.querySelectorAll('[data-skip]');
  const backwardButton = player.querySelector('.backward');
  const forwardButton = player.querySelector('.forward');

  // Add event listener to wait for the video to be loaded
  video.addEventListener('loadedmetadata', function() {
    // Set duration property for the video
    video.duration = video.duration || 60.08; // Set a default value if duration is NaN

    // Update progress bar once the video metadata is loaded
    updateProgress();

    // Function to toggle play/pause
    function togglePlay() {
      const method = video.paused ? 'play' : 'pause';
      video[method]();
    }

    // Function to update the play/pause button icon
    function updateButton() {
      const icon = video.paused ? '►' : '❚ ❚';
      toggle.textContent = icon;
    }

    // Function to update the progress bar
    function updateProgress() {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${percent}%`;
    }

    // Function to set the progress based on click
    function setProgress(e) {
      const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = newTime;
    }

    // Function to update the volume
    function updateVolume() {
      video.volume = volume.value;
    }

    // Function to update the playback speed
    function updatePlaybackSpeed() {
      video.playbackRate = playbackSpeed.value;
    }

    // Function to skip forward or backward
    function skip() {
      video.currentTime += parseFloat(this.dataset.skip);
    }

    // Function to go 10 seconds backward
    function backward() {
      video.currentTime -= 10;
    }

    // Function to go 25 seconds forward
    function forward() {
      video.currentTime += 25;
    }

    // Add event listeners
    video.addEventListener('click', togglePlay);
    toggle.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', updateProgress);
    progress.addEventListener('click', setProgress);
    volume.addEventListener('input', updateVolume);
    playbackSpeed.addEventListener('input', updatePlaybackSpeed);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    backwardButton.addEventListener('click', backward);
    forwardButton.addEventListener('click', forward);
  });
});
