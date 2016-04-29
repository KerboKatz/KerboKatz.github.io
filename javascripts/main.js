var modInfos = [
  {
    "name": "KerboKatzUtilities",
    "description": "This is a utility plugin that is needed in almost all of our mods.",
    "github": "Xarun/KerboKatzUtilities",
    "assetName": "KerboKatzUtilities.zip",
    "icon": "KerboKatz"
  },
  {
    "name": "AutomatedScienceSampler",
    "description": "Automates your science experiments.",
    "forum": "95531",
    "github": "Xarun/AutomatedScienceSampler",
    "curse": "automatedsciencesampler",
    "assetName": "AutomatedScienceSampler.zip"
  },
  {
    "name": "CraftHistory",
    "description": "CraftHistory replaces the stock craft loading and saving to include subfolders as well as create a history of your crafts.",
    "forum": "99770",
    "github": "Xarun/CraftHistory",
    "curse": "crafthistory",
    "assetName": "CraftHistory.zip"
  },
  {
    "name": "SmallUtilities",
    "description": "This is a pack of all the SmallUtility mods.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.zip",
    "icon": "Utilities"
  },
  {
    "name": "SmallUtilities - FPSLimiter",
    "description": "Adds the ability to limit the FPS in the background and while focused.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.FPSLimiter.zip"
  },
  {
    "name": "SmallUtilities - FPSViewer",
    "description": "Adds a display of the current, as well as minimum and maximum FPS.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.FPSViewer.zip"
  },
  {
    "name": "SmallUtilities - PhysicalTimeRatioViewer",
    "description": "Displays a simple layer much like FPSViewer to compare ingame vs real time speed.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.PhysicalTimeRatioViewer.zip"
  },
  {
    "name": "SmallUtilities - ModifiedExplosionPotential",
    "description": "Modifies the explosion potential in order to create bigger or smaller explosions.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.ModifiedExplosionPotential.zip",
    "icon": "Utilities"
  },
  {
    "name": "SmallUtilities - RecoverAll",
    "description": "Adds the ability to recover all landed vessels in one go.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.RecoverAll.zip",
    "icon": "Utilities"
  },
  {
    "name": "SmallUtilities - DestroyAll",
    "description": "Adds the ability to destroy multiple vessels quickly.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.DestroyAll.zip",
    "icon": "Utilities"
  },
  {
    "name": "SmallUtilities - EditorCamUtilities",
    "description": "This little tool allows you to switch between the VAB and SPH camera.",
    "forum": "104505",
    "github": "Xarun/SmallUtilities",
    "curse": "kerbokatz-smallutilities",
    "assetName": "SmallUtilities.EditorCamUtilities.zip",
    "icon": "EditorCamUtilities"
  }
];

var ajaxCallbacks;
var body;
var spacer = "<span>&nbsp;-&nbsp;</span>";
var isWebkit = false;
// Shorthand for $( document ).ready()
$(function () {
  isWebkit = 'WebkitAppearance' in document.documentElement.style

  body = $("html,body");
  ajaxCallbacks = new Dictionary();
  template = $("#ModTemplate");
  template.removeAttr("id");
  jumpLinkTemplate = $("#jumpLinkTemplate");
  modInfos.forEach(InitMods);
  ajaxCallbacks.iterate(WorkCallback);
  template.remove();
  $(window).on('hashchange', function () {
    CheckHashState();
  });
  CheckHashState();
  var windowC = $(window);
  var headerWraper = $("#header_wrap");
  var headerLogo = $("#headerLogo");
  var headerIntro = $("#header_intro");
  var headerIntroOffset = 0;
  var reCalculate = () => {
    headerIntroOffset = (headerIntro.offset().top + headerIntro.outerHeight() - 25);
  }
  reCalculate();
  window.setTimeout(reCalculate, 1000);
  window.setTimeout(reCalculate, 10000);
  windowC.scroll(function () {
    var scrollTop = windowC.scrollTop();
    var normalized = scrollTop / headerIntroOffset;
    var lerped = Lerp(50, 25, normalized);
    headerWraper.css({
      "height": lerped
    });
    lerped = Lerp(99, 50, normalized);
    headerLogo.css({
      "width": lerped,
      "height": lerped
    });
  });
});
function CheckHashState() {
  var slice = location.hash.slice(1);
  if (slice.length > 0) {
    if (slice.indexOf("!") > -1)
      return;
    var target = $("#JumpTo" + slice);
    if (target.length) {
      JumpTo(target);
    }
  }
}
function JumpTo(target) {
  body.stop().animate({
    scrollTop: target.offset().top - 25
  }, 1000);
}
function WorkCallback(apiLink, callbacks) {
  $.getJSON(apiLink, (githubData) => {
    callbacks.forEach((callback) => {
      callback(githubData);
    });
  });
}
function InitMods(mod) {
  var nameSpaceless = mod.name.replace(/\s/g, '')
  var modTemplate = template.clone().appendTo(template.parent());
  var infoContainer = modTemplate.children(".infoContainer");
  var linksContainer = infoContainer.children(".linksContainer");
  infoContainer.children(".invisibleLink").attr("id", "JumpTo" + nameSpaceless);
  infoContainer.children(".ModName").text(mod.name);


  var forumLinkObj = linksContainer.children(".forumLink");
  var githubObj = linksContainer.children(".githubLink");
  var sourceObj = linksContainer.children(".sourceLink");
  var curseLink = linksContainer.children(".curseLink");
  var description = infoContainer.children(".description");

  var icon = mod.name;
  if (typeof mod.icon != "undefined")
    icon = mod.icon;
  modTemplate.children(".ModIcon").attr("src", "./modIcons/" + icon + ".png");

  if (typeof mod.description != "undefined") {
    description.text(mod.description);
  } else {
    description.remove();
  }
  var prevLinkSet = false;
  if (typeof mod.curse != "undefined") {
    curseLink.attr("href", "http://kerbal.curseforge.com/projects/" + mod.curse + "/files");
    prevLinkSet = true;
  } else {
    curseLink.remove();
  }
  if (typeof mod.github != "undefined") {
    if (prevLinkSet)
      $(spacer).insertBefore(githubObj);
    $(spacer).insertBefore(sourceObj);
    githubObj.attr("href", "https://github.com/" + mod.github + "/releases");
    sourceObj.attr("href", "https://github.com/" + mod.github);

    prevLinkSet = true;

    var apiLink = "https://api.github.com/repos/" + mod.github + "/releases";
    var count = 0;
    var releaseDate = 0;
    var lastVersion = 0;
    var callbacks = ajaxCallbacks.get(apiLink);
    if (!callbacks) {
      callbacks = new Array();
      ajaxCallbacks.add(apiLink, callbacks);
    }
    callbacks.push(function (data) {
      data.forEach((data) => {
        data.assets.forEach(
          (asset) => {
            if (asset.name == mod.assetName) {
              if (lastVersion == 0) {
                lastVersion = data.name;
              }
              if (releaseDate == 0) {
                releaseDate = data.published_at;
              }
              count += asset.download_count;
            }
          }
        );
      });
      if (releaseDate != 0) {
        var timeSplit = releaseDate.split("T");
        var date = timeSplit[0].split("-");
        var time = timeSplit[1];
        infoContainer.children(".releaseDateContainer").children(".releaseDate").text(date[2] + "." + date[1] + "." + date[0]);
      }
      if (lastVersion != 0)
        infoContainer.children(".lastVersionContainer").children(".lastVersion").text(lastVersion);
      infoContainer.children(".downloadCountContainer").children(".downloadCount").text(count);

      if (isWebkit) {
        var height = modTemplate.height() - 50;
        var rightSide = modTemplate.children(".dashedLineRight");
        rightSide.css("height", height);
        rightSide.css("marginLeft", 2);
        modTemplate.children(".dashedLineLeft").css("height", height);
      }
    });

  } else {
    githubObj.remove();
    sourceObj.remove();
  }
  if (typeof mod.forum != "undefined") {
    if (prevLinkSet)
      $(spacer).insertBefore(forumLinkObj);
    forumLinkObj.attr("href", "http://forum.kerbalspaceprogram.com/index.php?/topic/" + mod.forum + "-1");
  } else {
    forumLinkObj.remove();
  }
}



function Lerp(a, b, t) {
  t = Clamp(t, 0, 1);
  return a + t * (b - a);
}
function Clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
};

//got this from here and modified it: http://stackoverflow.com/a/15600719 - http://jsfiddle.net/MickMalone1983/VEpFf/2/
function Dictionary(overwrite) {
  this.overwrite = overwrite == true;
  var __k = [];
  var __v = [];

  this.add = function (key, value) {
    if (!this.overwrite || __k.indexOf(key) == -1) {
      __k.push(key);
      __v.push(value);
    }
  }
  this.get = function (key, value) {
    var index = __k.indexOf(key);
    if (index == -1)
      return false;
    return __v[index];
  }

  this.remove = function (key) {
    var i = __k.indexOf(key);
    if (i != -1) {
      __k.splice(i, 1);
      __v.splice(i, 1);
    }
  }

  this.clearAll = function (value) {
    for (var i = 0; i < __v.length; i++) {
      if (__v[i] == value) {
        __k.splice(i, 1);
        __v.splice(i, 1);
      }
    }
  }

  this.iterate = function (func) {
    for (var i = 0; i < __k.length; i++) {
      func(__k[i], __v[i]);
    }
  }
  this.log = function () {
    console.log(__k);
    console.log(__v);
  }

}