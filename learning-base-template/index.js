/**
 * Container Resizer Controller
 * Handles resizing the container when resizers are dragged
 */

class ContainerResizerController {
  constructor() {
    this.testContainer = document.getElementById('testContainer');
    this.rightResizer = document.getElementById('rightResizer');
    this.bottomResizer = document.getElementById('bottomResizer');
    this.widthText = document.getElementById('widthText');
    this.heightText = document.getElementById('heightText');

    // Track active drag operations
    this.isRightResizerDragging = false;
    this.isBottomResizerDragging = false;

    this.init();
    this.updateDimensions();
  }

  /**
   * Update the dimensions display
   */
  updateDimensions() {
    const width = Math.round(this.testContainer.offsetWidth);
    const height = Math.round(this.testContainer.offsetHeight);
    this.widthText.textContent = `width: ${width}`;
    this.heightText.textContent = `height: ${height}`;
  }

  /**
   * Initialize event listeners for both resizers
   */
  init() {
    this.setupRightResizerEvents();
    this.setupBottomResizerEvents();
  }

  /**
   * Setup right resizer drag event listeners
   */
  setupRightResizerEvents() {
    this.rightResizer.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isRightResizerDragging = true;
      this.startRightResizerDrag(event);
    });
  }

  /**
   * Setup bottom resizer drag event listeners
   */
  setupBottomResizerEvents() {
    this.bottomResizer.addEventListener('mousedown', (event) => {
      event.preventDefault();
      this.isBottomResizerDragging = true;
      this.startBottomResizerDrag(event);
    });
  }

  /**
   * Start drag operation for the right resizer - shrinks/grows container width
   * @param {MouseEvent} mouseDownEvent - The initial mouse down event
   */
  startRightResizerDrag(mouseDownEvent) {
    const startXPosition = mouseDownEvent.clientX;
    const startContainerWidth = this.testContainer.offsetWidth;
    const minContainerWidth = 150;

    const handleMouseMove = (mouseMoveEvent) => {
      if (!this.isRightResizerDragging) return;

      const currentXPosition = mouseMoveEvent.clientX;
      const deltaXPixels = currentXPosition - startXPosition;
      const newContainerWidth = startContainerWidth + deltaXPixels;

      // Enforce minimum width
      if (newContainerWidth >= minContainerWidth) {
        this.testContainer.style.width = `${newContainerWidth}px`;
        this.updateDimensions();
      }
    };

    const handleMouseUp = () => {
      this.isRightResizerDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  /**
   * Start drag operation for the bottom resizer - shrinks/grows container height
   * @param {MouseEvent} mouseDownEvent - The initial mouse down event
   */
  startBottomResizerDrag(mouseDownEvent) {
    const startYPosition = mouseDownEvent.clientY;
    const startContainerHeight = this.testContainer.offsetHeight;
    const minContainerHeight = 100;

    const handleMouseMove = (mouseMoveEvent) => {
      if (!this.isBottomResizerDragging) return;

      const currentYPosition = mouseMoveEvent.clientY;
      const deltaYPixels = currentYPosition - startYPosition;
      const newContainerHeight = startContainerHeight + deltaYPixels;

      // Enforce minimum height
      if (newContainerHeight >= minContainerHeight) {
        this.testContainer.style.height = `${newContainerHeight}px`;
        this.updateDimensions();
      }
    };

    const handleMouseUp = () => {
      this.isBottomResizerDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
}

// Initialize the container resizer controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContainerResizerController();
});