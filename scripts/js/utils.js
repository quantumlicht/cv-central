   function arraysEqual(arr1, arr2) {

      if(arr1.length !== arr2.length)
         return false;
      for(i = arr1.length; i--;) {
         if(arr1[i] !== arr2[i])
            return false;
      }

      return true;
   }

   function getDateFromString(ele, allclasses){
      allclasses = typeof allclasses == 'boolean' ? allclasses : false;

      // We substract 1 from date because jan is 0 and in the html its makes more sens to have a more litteral date.
      arr = ele.match(/([0-9]{4})_([0-9]{2}) (([0-9]{4})_([0-9]{2})|(year)_(month))/);
      // console.log(arr);
      if (allclasses) {
         arr =  arr.map(function(elem){
            // We substract 1 from date because jan is 0 and in the html its makes more sens to have a more litteral date.
            if(elem<=12 && !isNaN(elem)){
               //months
               return parseInt(elem,10)-1;
            }
            else if(elem > 12 && !isNaN(elem)){
               // years
               return parseInt(elem,10);
            }
            else if(elem=='year'){
               //marker for current year
              return new Date().getFullYear(); 
            }
            else if(elem=='month'){
               //marker for current month
               return new Date().getMonth();
            }
         });
         return arr.filter(function(ele){return  !isNaN(ele);});
      }
      else {
         arrDates = arr.slice(1); //removing first match of regexp that is of the form 2011_11;
         return arrDates.map(function(elem){return parseInt(elem,10)-1;});
      }
   }

   function getIdentifiersFromString(ele){
      res = {};
      matches = ele.attr('id').match(/^([a-z]*)_([0-9]{1,2})/);
      res.sectionId = matches[1];
      res.sectionItemId = matches[2];

      return res;
   }

   function getStaticConfigurator(){
      res = new (function(){
         var data = {};
         this.set = function(key, value) {
            if(typeof data[key] == 'undefined'){            
               data[key] = value;
            }
            // else{
            //    // Maybe a little error handling too...
            //    throw new Error("Can't set static variable that's already defined!");
            // }
         };
         this.get = function(key){
            if (typeof data[key] == 'undefined') {
               // Maybe a little error handling too...
               throw new Error("Can't get static variable that isn't defined!");
            }
            else {
             return data[key];
            }
         };
      })();

      return res;
   }

   function getTimelinePosition(timeToSet){
      var ratio = (timeToSet - Config.timeline.startDate.getTime()) / (Config.timeline.currentDate.getTime() - Config.timeline.startDate.getTime());
      if (isNaN(Config.timeline.height)){
         height = parseStringAsFontSize(Config.timeline.height);
      }
      else{
         height = Config.timeline.height;
      }
      // present is at the top and past is at the bottom of the timeline.
      return (1 - ratio) * height;
   }

   function getTimespanInPixel(startDate, endDate){
      
      if (isNaN(Config.timeline.height)){
         height = parseStringAsFontSize(Config.timeline.height);
      }
      else{
         height = Config.timeline.height;
      }

      return (endDate - startDate) / Config.timelineLength_2_timestamp * height;
   }

   function parseStringAsFontSize(stringToParse){
      var res;
      if (stringToParse.match(/em/)){
         res =  parseInt(stringToParse,10) * Number(getComputedStyle(document.body,"").fontSize.match(/(\d*(\.\d*)?)px/)[1]);

      }
      else{
         res = parseInt(stringToParse,10);
      }
      return res;
   }

   function setSkrollr(){

      $navbar = $('.navbar-container')
      var objDistance = $navbar.offset().top;
      $(window).scroll(function() {
         var myDistance = $(window).scrollTop();
         if (myDistance > objDistance){
            $navbar.css('position','fixed');
            $navbar.addClass('navbar-fixed-top');
         }
         if (objDistance > myDistance){
            $navbar.css('position','relative');
            $navbar.removeClass('navbar-fixed-top');
         }
      });
   }
