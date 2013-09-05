
$(function(){


   //====================================================================================================
   //          GLOBALS
   //====================================================================================================
   var i,
   staticConfig = getStaticConfigurator(),
   initPos=[],
   currentSectionIndex,
   milestoneDiameter,
   arrSectionHeights = [];
   var objSiteContentData = {};

   //====================================================================================================
   //          SETUP FUNCTIONS
   //====================================================================================================

   function initTimeline(data, init){
      init = typeof init == 'boolean' ? init : false;
      
      setYearItems();

      $milestoneContainer = $('#milestone-node-container');
      $('#timeline-container > #timeline').height(Config.timeline.height);
      timelineData = {}

      $.each(data, function(sectionId, sectionContent){
         timelineData[sectionId] = [];

         $.each(sectionContent, function(sectionItemId, sectionItem){
            start = sectionItem['start'].split('_');
            startDate = new Date(start[0], start[1]).getTime();         
            
            if (sectionItem['end'] == 'now'){
               endDate = new Date().getTime();
            }
            else{
               end = sectionItem['end'].split('_');
               endDate = new Date(end[0], end[1]).getTime();         
            }
            
            timelinepos = getTimelinePosition(endDate);
            timespan = getTimespanInPixel(startDate, endDate);

            timelineData[sectionId].push({
               pos: timelinepos,
               span: timespan,
               content: data[sectionId][sectionItemId]
            });

            curContentItem = $('<div>',
               {
                  'class': 'milestone-node ' + sectionId,
                  'id': sectionId+'_'+sectionItemId +' '+sectionItem['start']+' '+sectionItem['end'],
                  css: {
                     top: timelinepos
                  }
               }
            );
            curContentItem.hover(
               function(){
                  Identifier = getIdentifiersFromString($(this));
                  itemId = Identifier.sectionItemId;
                  section = Identifier.sectionId;

                  pane = $('#'+section);
                  timespan = $('#timespan-'+section +'> .timespan-container');
                  
                  setPaneContent(pane, staticConfig.get('timeline-data')[section][itemId].content);
                  paneHeight = pane.height();
                  pane.css('top', (parseInt($(this).css('top'),10) + paneHeight/2) + 'px' );
                  
                  pos = staticConfig.get('timeline-data')[section][itemId].pos;
                  span = staticConfig.get('timeline-data')[section][itemId].span;
                  $(timespan).css({top: pos});
                  $(timespan).height(span);

                  //TO DO:
                  // timelineHoverin($(contentItem), timelineId);
               },
               function(){
                  //TO DO:
                  // hoverout($(this));
               }
            );
            $milestoneContainer.append(curContentItem);
         });
         

         //correct milestone position to account for circle radius
         // height = parseInt($(curContentItem).css('height'),10);
         // $(curContentItem).css('top',getTimelinePosition((startDate+endDate+height)/2));
      });

      staticConfig.set('timeline-data', timelineData);

      // initiate content into the display pane
      // $milestoneContainer.children('.timeline-timespan').css({top: arrDateObject[firstindex].timelinepos});
      // $milestoneContainer.children('.timeline-timespan').height(arrDateObject[firstindex].timespan);
      // timelineHoverin(arrContent[0],timelineId);
      
      // expand($('.timeline-milestone').eq(0),0);
   }
   function setPaneContent(pane, objContent){

      pane.children().html('');
      paneId = pane.attr('id');
      $.each(objContent, function(key,val){
         elem = $('#'+paneId+'>#'+key);

         if($.isArray(val) && elem.is('ul')){
            $.each(val,function(listItemKey, listItemVal){
               prop = listItemVal.item? 'item':'subdescription';
               if(prop){
                  elem = $('<li>',{
                     html: listItemVal[prop],
                     class:prop
                  }).appendTo($(pane).children('ul'));
               }

            });
         }
         else{
            elem.html(val);
         }
         $('.subdescription').wrap('<i/>')
      });

   }

   function setYearItems(){
      // $('#ruler').html('');   
      // $('#year-items').html('');   
      var inc;

      startYear = Config.timeline.startDate.getFullYear();
      endYear = Config.timeline.currentDate.getFullYear();
      
      $timebar = $('#timeline-container #timebar');
      $timebar.height(parseStringAsFontSize(Config.timeline.height));

      $ruler = $('#timeline-container #ruler');
      $ruler.height(parseStringAsFontSize(Config.timeline.height));

      nbSteps = 12 * (endYear-startYear);

      for ( inc=0; inc <= nbSteps; inc++ ){
         // you can pass months larger than 12. it will compute in the following year.
         currentDate = new Date(startYear,inc);
         topPos = getTimelinePosition(currentDate.getTime());
         elem = $('<div/>', {
            id: String(currentDate.getFullYear()) +'_' + String(currentDate.getMonth()),
            css: {
               top: topPos
            },
            class: 'ruler-tick',
            text:'-'
         }).appendTo($ruler);

         if(inc%12==0){
            $('<div/>',{
               class: 'timebar-item',
               css: {
                  top: topPos
               },
               html: currentDate.getFullYear()
            }).appendTo($timebar);
            elem.addClass('year-start');
         }
      }         
   }

   //=========================================================================
   //          SCRIPT ENTRY POINT
   //=========================================================================

   $('document').ready(function(){

      $.fn.reverse = [].reverse;

      $.ajax({
         async: false,
         dataType: 'json',
         url: 'data.json',
         success: function(data){
            objSiteContentData = data;
         }
      });

      initTimeline(objSiteContentData, true);

      // percent = $(window).width() * 100 / Config.baseScreenWidth;
      // $('html').css('font-size', percent+'%');



      // milestoneDiameter = $('.timeline-milestone').eq(0).width();
      

      // $(window).resize(function(evt){
      //    percent = $(window).width() * 100 / Config.baseScreenWidth;
      //    $('html').css('font-size',percent+'%');

      //    setTimelines($('.timeline-container'),['experience','project'], true);
      //    // setYearItems();
      //    console.log($(window).width(),$(window).height());
      // });
   //=================
   });
});

