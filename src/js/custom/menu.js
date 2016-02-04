// JavaScript Document


$(function(){


  //privateページに遷移した時パラメータを読み込んでタブを表示
  $.fn.tabs = function(options) {
   var o = $.extend({
    targetID: '.common_area',
    tabElement: '.tab_private li a',
    boxElement: '.tabs_panel',
    defaultOpenTab: 0,
    parmName: 'tab',
    tabName01: 'tab01',
    tabName02: 'tab02',
  }, options);

   $(o.tabElement, o.targetID).each(function() {

    var selectedTab = $.cookie(o.targetID + 'selectedTab');
    if (selectedTab) {
     $(o.boxElement, o.targetID).not(':eq(' +selectedTab+')').hide();
     $(o.tabElement, o.targetID).eq(selectedTab).parent('li').addClass('js_current');

   } else {
     $(o.boxElement, o.targetID).hide().eq(o.defaultOpenTab).show();
     $(o.tabElement, o.targetID).eq(o.defaultOpenTab).parent('li').addClass('js_current');
   }

 });

   var parm = getUrlVars();
   if(o.parmName in parm) {
    key = decodeURI(parm[o.parmName]);

    switch (key){
     case o.tabName01:
     $(o.tabElement, o.targetID).parent('li').removeClass('js_current');
     $(o.tabElement, o.targetID).eq(0).parent('li').addClass('js_current');
     $(o.boxElement, o.targetID).hide();
     $(o.boxElement, o.targetID).eq(0).fadeIn();
     break;
     case o.tabName02:
     $(o.tabElement, o.targetID).parent('li').removeClass('js_current');
     $(o.tabElement, o.targetID).eq(1).parent('li').addClass('js_current');
     $(o.boxElement, o.targetID).hide();
     $(o.boxElement, o.targetID).eq(1).fadeIn();
     break;
   }
 }

 function getUrlVars() {
  var vars = [];
  var hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
  for(var i = 0; i < hashes.length; i++) {
   hash = hashes[i].split('=');
   vars.push(hash[0]);
   vars[hash[0]] = decodeURI(hash[1]);
 }
 return vars;
}
return this;
};


  //ページ内リンク
  $(window).load(function() {
   $('.js_scroll[href^=#]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").stop().animate({scrollTop:position - 80}, speed, 'easeInQuad');
    return false;
  });
 });

  // スマホページのナビゲーション
  $('#js_nav_global_open').on('click', function (event) {
   event.preventDefault();
   $('#js_nav_global').fadeToggle();
 });

  // タブの切替処理
  var $tabList   = $(this).find('.tab_private'),
  $tabItem = $tabList.find('li'),
  $tabAnchors = $tabList.find('a'),
  $tabPanels  = $(this).find('.tabs_panel');

  $tabList.on('click', 'a', function (event) {
    event.preventDefault();
    var $this = $(this);

    if ($this.parent('li').hasClass('js_current')) {
      return;
    }

    $tabItem.removeClass('js_current');
    $this.parent('li').addClass('js_current');

    $tabPanels.hide();
    $($this.attr('href')).fadeIn();

    if($this.attr('href') == '#private') {
      $('.category_private').find('a').addClass("is_current");
      $('.category_amenity').find('a').removeClass("is_current");
    }else if($this.attr('href') == '#amenity'){
      $('.category_amenity').find('a').addClass("is_current");
      $('.category_private').find('a').removeClass("is_current");
    }
  });

  $tabItem.eq(0).trigger('click');

});

