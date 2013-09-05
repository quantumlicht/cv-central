var Config = {
   baseScreenWidth: 1200,
   color: {
      border: 'rgba(209, 242, 223, 0.32)',
      nav_background: 'rgba(166, 52, 64, 0.9)',
      nav_selected: 'rgba(142, 165, 151, 0.9)'
   },
   displayTile: {
     animateEase: 'linear'
   },
   navbar: {
      animationDelays: {
         arrow: 700,
         hoverin: 1500,
         hoverout: 500
      },
      arrowAnimationLength: '2%'
   },
   sectionPenetrationPercentage: 0.03, // percentage of pixel inside the section to trigger the scrollspy animation.
   sectionTopMargin: 40,
   scrollbar : {
      animateDuration: 1000,
      animateEase: 'easeOutCubic',
      animateScroll: false,
      arrowButtonSpeed: 50,
      mouseWheelSpeed: 50,
      showArrows: true,
      verticalDragMaxHeight: 70,
      verticalDragMinHeight: 50,
      verticalGutter: 10
   },
   timeline: {
      animationDelays: {
         contentShow: 500,
         contentHide: 300,
         timespan: 1250,
         milestone: 1000
      },
      milestone: {
         expandFactor: 1.75,
         resizeDelay: 300
      },
      currentDate: new Date(2014,0),
      height: '15em',
      startDate: new Date(2007,0)
   }
};