//====================================================================================================
//          ANIMATIONS
//====================================================================================================

   function hoverin(elem){

      elem.stop().animate({'backgroundColor': Config.color.border}, Config.navbar.animationDelays.hoverin);
   }

   function hoverout(elem){

      elem.stop().animate({'backgroundColor': Config.color.nav_background}, Config.navbar.animationDelays.hoverout);
   }

   function expand(element, index){
      element.css({opacity:'1'});

      others = $('.timeline-milestone:not(:eq(' + index + '))');
      others.stop(true, true)
         .css({opacity:'1'})
         .animate({opacity:'0.3'},'fast');

      factor = Config.timeline.milestone.expandFactor;
      timelineWidth = parseInt($('.timeline-container').css('borderLeftWidth'),10);

      // make displacements static
      sideDisplacementExpand  = 0.5*(factor * milestoneDiameter + timelineWidth);
      staticConfig.set('sideDisplacementExpand', sideDisplacementExpand);
      sideDisplacementExpand = staticConfig.get('sideDisplacementExpand');

      topDisplacement = 0.5*(factor-1)* milestoneDiameter;
      staticConfig.set('topDisplacement', topDisplacement);
      topDisplacement = staticConfig.get('topDisplacement');
      
      // initial position static
      staticConfig.set('initPos'+index, parseInt(element.css('top'),10));
      pos = staticConfig.get('initPos'+index);

      elemTop = parseInt(element.css('top'),10);
      element.stop(true, false)
         .css({top:pos},100)
         // .animate({left: -sideDisplacementExpand,top:elemTop-topDisplacement, width: factor*milestoneDiameter, height: factor*milestoneDiameter},Config.timeline.milestone.resizeDelay);
         .animate({left: -sideDisplacementExpand, width: factor*milestoneDiameter, height: factor*milestoneDiameter},Config.timeline.milestone.resizeDelay);
   }

   function shrink(element, index){
      element.css({opacity:'1'});

      others = $('.timeline-milestone:not(:eq(' + index + '))');
      others.stop(true, true)
         .css({opacity:'0.3'})
         .animate({opacity:'1'}, 'fast');

      // make displacements static
      sideDisplacementShrink = 0.5*(milestoneDiameter + timelineWidth);
      staticConfig.set('sideDisplacementShrink', sideDisplacementShrink);
      sideDisplacementShrink = staticConfig.get('sideDisplacementShrink');

      topDisplacement = 0.5*(factor-1)* milestoneDiameter;
      staticConfig.set('topDisplacement', topDisplacement);
      topDisplacement = staticConfig.get('topDisplacement');

      // initial position static
      staticConfig.set('initPos'+index, parseInt(element.css('top'),10));
      pos = staticConfig.get('initPos'+index);

      elemTop = parseInt(element.css('top'),10);
      element.stop(true, false)
         .css({top:pos})
         .animate({left: -sideDisplacementShrink, width: milestoneDiameter, height: milestoneDiameter},Config.timeline.milestone.resizeDelay);
         // .animate({left: -sideDisplacementShrink, top:elemTop+topDisplacement, width: milestoneDiameter, height: milestoneDiameter},Config.timeline.milestone.resizeDelay);
   }

   function timelineHoverin(content, timelineIndex){

      pane = $('.display-tile #content-display').eq(timelineIndex);
      pane.stop(true,false).animate({bottom:Config.timeline.height},
         {
            'duration': Config.timeline.animationDelays.contentHide,
            'easing': Config.displayTile.animateEase,
            'complete': (function(pane,content){
               return function(){
                  pane.html(content);
               }
            })(pane,content)
         }
      );

      pane.animate({bottom:0},Config.timeline.animationDelays.contentShow);
      // $('#content-display').animate({bottom:0},'slow');
      $('.timeline-timespan').eq(timelineIndex).stop().css({opacity:0}).css('z-index',1).animate({opacity:1},Config.timeline.animationDelays.timespan);
   }

   function animateNavbar(navbarElement){

   $(navbarElement).children(':animated').stop(true,true);
   $('.selected-nav').mouseleave();
   $('.selected-nav').removeClass('selected-nav');
   $(navbarElement).addClass('selected-nav');

   //arrow animation
   // $(navbarElement).children(':animated').animate({right:0});
   // ($(navbarElement).children('img')).animate({right:Config.navbar.arrowAnimationLength}, Config.navbar.animationDelays.arrow).animate({right:0}, Config.navbar.animationDelays.arrow);
}

function navbarclick(navbarElement, navbarId){

   // global variable used by scrollspy to decide if we need to trigger the animation when switching section. We dont want to trigger it everytime scrollspy fires an event.
   currentSectionIndex = navbarId;

   animateNavbar(navbarElement);

   //scrolling to sections
   // we want to see the header when we scroll to the first section, so we scroll to the very top.
   section = $('.section-container').eq(navbarId);
   scrollDistance = navbarId==0 ? 0 : section.offset().top - Config.sectionTopMargin;


   $('html,body').stop(true,true).animate({scrollTop:scrollDistance},
      {
         'easing': Config.scrollbar.animateEase,
         'duration': Config.scrollbar.animateDuration
      });
   return false;
}

function scrollspy(delta, deltaX, deltaY){
   sectionIndex = getCurrentSectionIndex();
   if (sectionIndex != currentSectionIndex){
      animateNavbar($('.nav-item > a').eq(sectionIndex));
      currentSectionIndex = sectionIndex;
   }
}
 

