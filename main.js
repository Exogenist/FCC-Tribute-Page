var stateElement = [
    fuel = document.getElementById("fuel"),
    reactor = document.getElementById("reactor"),
    nozzle = document.getElementById("nozzle"),
    core = document.getElementById("core")
];

var fuelSelect = document.getElementById("fuelSelect");
var reloadSwitch = false;

function route(event) {
    return event.slice(1, location.hash.length);
}

function stateControl(event) {
    for (var i = 0; i < stateElement.length; i++) {
        if (stateElement[event] === stateElement[i]) {
            stateElement[event].setAttribute("opacity", "1");;
        } else {
            stateElement[i].setAttribute("opacity", "0")
        }
    }
}

var stateObj = {
    default: function () {

    },
    home: function () {
        for (var i = 0; i < stateElement.length; i++) {
            stateElement[i].setAttribute("opacity", "0");
        }
        document.getElementById("head").innerHTML = "NERVA engine development";
        document.getElementById("subHead").innerHTML = "Nuclear Thermal Rocket";
        document.getElementById("paragraph-1").innerHTML = "The Nuclear Engine for Rocket Vehicle Application (NERVA) was a U.S. nuclear thermal rocket engine development program that ran for roughly two decades. NERVA was a joint effort of the U.S. Atomic Energy Commission (AEC) and NASA, managed by the Space Nuclear Propulsion Office (SNPO) until both the program and the office ended at the end of 1972.";

    },
    fuel: function () {
        stateControl(0);
        document.getElementById("head").innerHTML = "The Fuel Compartment";
        document.getElementById("subHead").innerHTML = "hydrogen monopropellant"
        document.getElementById("paragraph-1").innerHTML = "The principal function of the nuclear engine was to heat the hydrogen monopropellant to an average temperature of ~ 2700 K. The reactor fuel was contained in compartments around the ship; these elements were made up of a composite mixture of graphite and a solid solution of UC-ZrC, and contained 19 flow passages each. Hydrogen was heated by passing through these holes, which were coated with a layer of ZrC to inhibit hydrogen corrosion. The total core uranium loading was 60 kg (92.5% enriched uranium). Heating the 8.5 kg/s of hydrogen flow to produce the nozzle-plenum condition at maximum specific impulse required a total thermal power of ~ 367 MW and resulted in 72,975 N (16,406 lb) of thrust";
    },
    reactor: function () {
        stateControl(1);
        document.getElementById("head").innerHTML = "The Reactor ";
        document.getElementById("subHead").innerHTML = "Reactor core and hardware";
        document.getElementById("paragraph-1").innerHTML = "Nuclear criticality control was achieved by 12 circular solid drums of beryllium, which were covered over a 120-deg sector of their periphery with a boron-containing \"poison\" plate. Gang rotation of the drums changed the position of the boron plates, thus controlling the number of neutrons in the reflector which could return to the core without capture. The total control span was roughly 9.0% of reactivity. These drums and their drive mechanisms were the only moving parts housed within the reactor pressure vessel."
    },
    nozzle: function () {
        stateControl(2);
        document.getElementById("head").innerHTML = "The Nozzle";
        document.getElementById("subHead").innerHTML = "Nozzle and skirt assembly";
        document.getElementById("paragraph-1").innerHTML = "The reactor nozzle was a conventional, regeneratively cooled, U-tube design. The nozzle and the reflector were cooled in series by 45% of the hydrogen coolant flow. This flow entered the nozzle at a torus located at the 25:1 area-ratio point, passed through thin-walled Inconel tubes toward the core, and discharged into the reflector aft-end plenum. After passing through the reflector, this flow was mixed with the turbine discharge flow, and the combined flow then cooled the shield, the core-support plate, and the core in series."
    }
}

// The load function checks navigation bar for location and updates state according to location.
function load(event) {
    if (location.hash) {
        window["stateObj"][route(location.hash)]();

    } else {
        history.pushState(null, "null", "/#home");
        window["stateObj"][route(location.hash)]();
    }
}

function attr(num) {
    return stateElement[num].getAttribute("opacity");
}

window.onpopstate = function (event) {
    window["stateObj"][route(location.hash)]();
}

window.onload = function () {
    function initState(element, hash, n) {
        if (attr(n) === "0") {
            history.pushState(null, "null", hash);
            load();
        } else if (attr(n) === "1") {
            history.pushState(null, "null", "/#home");
            window["stateObj"][route(location.hash)]();
        }
    }

    load();

    fuelSelect.addEventListener("click", function (event) {
        event.preventDefault();
        initState("fuelSwitch", "/#fuel", 0);

    });

    reactorSelect.addEventListener("click", function (event) {
        event.preventDefault();
        initState("reactorSwitch", "/#reactor", 1);
    });

    nozzleSelect.addEventListener("click", function (event) {
        event.preventDefault();
        initState("nozzleSwitch", "/#nozzle", 2);
    });
};
