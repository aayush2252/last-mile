export const createSvgMarkerIconWithImg = function(num, waypoint, routeDepartureTime, routeTotalTime) {
  var wayPointColor = "#A9D4FF";
  var estDep = waypoint.estimatedDeparture;
  var estArv = waypoint.estimatedArrival;
  var spent = (estArv !== null ? "Arrive: " + estArv.substr(11, 5) + "  " : "") + (estDep !== null ? "Leave: " + estDep.substr(11, 5) : "");
  var constraintsDescr = waypoint.fulfilledConstraints[0] || null;
  var line1 = waypoint.id;
  var line2 = spent.length > 2 ? spent : null;

  var div = document.createElement("div");
  div.style.marginTop = "-57px";
  div.style.marginLeft = "-23px";

  var timelineEvents = [];

  var timeline =
    '<rect id="label-box" ry="3" rx="3" stroke="#000000" stroke-width="1" fill-opacity="0.6" height="9" width="188" y="0" x="17.5" fill="white"/>';

  var totalLenght = 188;
  var startX = 17.5;

  var completedWidth;
  if (waypoint.estimatedDeparture) {
    var waypointDepartureTime = new Date(waypoint.estimatedDeparture).getTime() / 1000;
    timelineEvents.push({ name: "dep", time: waypointDepartureTime });
    var waypointDepartureTimeOffset = waypointDepartureTime - routeDepartureTime;
    completedWidth = (totalLenght / routeTotalTime) * waypointDepartureTimeOffset;
  } else {
    completedWidth = totalLenght;
  }
  timeline +=
    '<rect id="label-box" ry="3" rx="3" stroke-width="0" fill-opacity="0.6" height="9" width="' +
    completedWidth +
    '" y="0" x="17.5" fill="#121212" />';

  // Arrival red line, not for the first waypoint.
  if (waypoint.estimatedArrival) {
    var waypointArrivalTime = new Date(waypoint.estimatedArrival).getTime() / 1000;
    timelineEvents.push({ name: "arr", time: waypointArrivalTime });
    var waypointArrivalTimeOffset = waypointArrivalTime - routeDepartureTime;
    var arrX = startX + (totalLenght / routeTotalTime) * waypointArrivalTimeOffset;
    var arrBox = '<rect id="label-box" stroke-width="0" height="9" width="2" y="0" x="' + arrX + '" fill="red" />';
  }

  if (constraintsDescr) {
    var constraints = constraintsDescr.split(";");

    var accBoxes = "";
    var stBox = "";
    var atBox = "";

    for (var i = 0; i < constraints.length; i++) {
      var sepIndex = constraints[i].indexOf(":");
      var constraintType = constraints[i].substr(0, sepIndex);
      var constraint = constraints[i].substr(sepIndex + 1);
      switch (constraintType) {
        case "acc":
          // Only one supported ad the moment. When we have more, just position them at different y and make the st higher.
          var accessStart = constraint.split("|")[0];
          var accessEnd = constraint.split("|")[1];

          var days = { mo: 1, tu: 2, we: 3, th: 4, fr: 5, sa: 6, su: 0 };
          var constraintDay = days[accessStart.substring(0, 2)];
          var arrivalDate = new Date(waypoint.estimatedArrival);
          var firstPart = waypoint.estimatedArrival.split("T")[0];

          function getMinAccessTimeOffset() {
            var nextCheckDate = new Date(firstPart + "T" + accessStart.substring(2));

            while (arrivalDate.getDay() !== nextCheckDate.getDay() || arrivalDate < nextCheckDate) {
              nextCheckDate.setDate(nextCheckDate.getDate() - 1);
            }

            var offset = nextCheckDate.getTime() / 1000 - routeDepartureTime;
            return offset < 0 ? 0 : offset;
          }

          function getMaxAccessTimeOffset() {
            var nextCheckDate = new Date(firstPart + "T" + accessEnd.substring(2));

            while (arrivalDate.getDay() !== nextCheckDate.getDay() || arrivalDate > nextCheckDate) {
              nextCheckDate.setDate(nextCheckDate.getDate() + 1);
            }

            var offset = nextCheckDate.getTime() / 1000 - routeDepartureTime;
            return offset > routeTotalTime ? Number(routeTotalTime) : offset;
          }

          var leftMatchingTimeOffset = getMinAccessTimeOffset();
          timelineEvents.push({ name: "accStarts", time: leftMatchingTimeOffset + routeDepartureTime });

          var rightMatchingTimeOffset = getMaxAccessTimeOffset();

          timelineEvents.push({ name: "accEnds", time: rightMatchingTimeOffset + routeDepartureTime });
          var acc = rightMatchingTimeOffset - leftMatchingTimeOffset;

          var accX = startX + (totalLenght / routeTotalTime) * leftMatchingTimeOffset;
          var accWidth = (totalLenght / routeTotalTime) * acc;

          accBoxes +=
            '<rect id="label-box" stroke-width="0" ry="1" rx="1" height="2" width="' + accWidth + '" y="6" x="' + accX + '" fill="#59b354" />';
          break;
        case "st":
          var st = Number(constraint);
          var stWidth = (totalLenght / routeTotalTime) * st;
          break;
        case "at":
          var at = new Date(constraint);
          var waypointConstrainedArrivalTime = at.getTime() / 1000;
          timelineEvents.push({ name: "at", time: waypointConstrainedArrivalTime });
          var waypointConstrainedArrivalTimeOffset = waypointConstrainedArrivalTime - routeDepartureTime;

          var atX = startX + (totalLenght / routeTotalTime) * waypointConstrainedArrivalTimeOffset;
          atBox = '<rect id="at-constraint-box-' + num + '" stroke-width="0" height="9" width="2" y="0" x="' + atX + '" fill="yellow" />';
          break;
        case "before":
          var beforeConstraint = constraint;
          timelineEvents.push({ name: "before", time: "", constraintDescription: beforeConstraint });
          break;
        default:
          console.error("Cannot visualize unsupported constraint: " + constraintType);
      }
    }

    if (st) {
      // If 'at' constraint is matched, service time starts there.
      var stX = atX || arrX;
      if (atX) {
        timelineEvents.push({ name: "stStarts", time: waypointConstrainedArrivalTime });
        timelineEvents.push({ name: "stEnds", time: waypointConstrainedArrivalTime + st });
      } else {
        timelineEvents.push({ name: "stStarts", time: waypointArrivalTime });
        timelineEvents.push({ name: "stEnds", time: waypointArrivalTime + st });
      }
      stBox = '<rect id="at-constraint-box-' + num + '" stroke-width="0" height="4" width="' + stWidth + '" y="1" x="' + stX + '" fill="#1b5fcc" />';
    }

    // SVG z-order depends on relative order of elements.
    timeline += accBoxes + stBox + atBox + arrBox;
  }

  var svg =
    '<svg overflow="visible" width="220" height="900" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
    "<g>" +
    '<rect id="label-box-' +
    num +
    '" ry="3" rx="3" stroke="#000000" height="30" width="155" y="11" x="50" fill="' +
    wayPointColor +
    '"/>' +
    "<a onclick='toggleWaypointDetails(" +
    num +
    ", " +
    waypoint.lat +
    ", " +
    waypoint.lng +
    ", " +
    JSON.stringify(timelineEvents) +
    ');\' xlink:href="#">' +
    '<image width="16" height="16" x="54" y="14"  xlink:href="/assets/examples/history-18dc45c66780067155602e25002549c06ec01d7b028e7c1f339d4974a4c604d2.svg" />' +
    "</a>" +
    '<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" y="24" x="70" stroke-width="0" fill="#000000">__line1__</text>' +
    '<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="9" font-weight="bold" y="37" x="55" stroke-width="0" fill="#000000">__line2__</text>' +
    '<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,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" />' +
    '<text id="label-text" xml:space="preserve" text-anchor="middle" font-family="Sans-serif" font-size="18" font-weight="bold" y="33" x="33" stroke-width="0" fill="#ffffff">__num__</text>' +
    (timeline || "") +
    "</g>" +
    "</svg>";

  svg = svg.replace(/__line1__/g, line1);
  svg = svg.replace(/__line2__/g, line2 !== null ? line2 : "");
  svg = svg.replace(/__num__/g, num);
  div.innerHTML = svg;

  return new window.H.map.DomIcon(div, {
    width: 33,
    height: 33,
    drawable: false
  });
};
