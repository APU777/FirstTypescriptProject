class RValue {
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
class Unit {
}
class Swordsman extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Warrior";
        this.Health = RValue.randomIntFromInterval(2000, 2500);
        this.Attack = RValue.randomIntFromInterval(20, 30);
        this.Armour = RValue.randomIntFromInterval(100, 150);
    }
}
class Wizard extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Mage";
        this.Health = RValue.randomIntFromInterval(1000, 1500);
        this.Attack = RValue.randomIntFromInterval(20, 50);
        this.Armour = RValue.randomIntFromInterval(10, 40);
    }
}
class Archer extends Unit {
    constructor() {
        super(...arguments);
        this.Name = "Archer";
        this.Health = RValue.randomIntFromInterval(1500, 2300);
        this.Attack = RValue.randomIntFromInterval(10, 50);
        this.Armour = RValue.randomIntFromInterval(20, 50);
    }
}
class Battlefield {
    Attack(hAttack, toHealth, toArmour) {
        toHealth = toHealth - (hAttack - (toArmour * 0.5));
        return toHealth;
    }
}
function selectorHero(typeHero) {
    switch (typeHero) {
        case "Warrior":
            return new Swordsman();
        case "Mage":
            return new Wizard();
        case "Hunter":
            return new Archer();
    }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
function startBattle(fP, sP) {
    $("#basicText").text(null);
    let battle = new Battlefield();
    while (true) {
        $("#basicText").append("<strong>" + fP.Name + ": " + fP.Health + "hp<strong/> was attacked by <strong>" + sP.Name + ": " + sP.Health + "hp<strong/> for " + battle.Attack(sP.Attack, fP.Health, fP.Armour) + "damage. <br/><br/>");
        fP.Health -= battle.Attack(sP.Attack, fP.Health, fP.Armour);
        if (fP.Health <= 0) {
            $("#basicText").append("<strong>" + sP.Name + ": " + sP.Health + "hp<strong/> is winner. <br/><br/>");
            break;
        }
        $("#basicText").append("<strong>" + sP.Name + ": " + sP.Health + "hp<strong/> was attacked by <strong>" + fP.Name + ": " + fP.Health + "hp<strong/> for " + battle.Attack(fP.Attack, sP.Health, sP.Armour) + "damage. <br/><br/>");
        sP.Health -= battle.Attack(fP.Attack, sP.Health, sP.Armour);
        if (sP.Health <= 0) {
            $("#basicText").append("<strong>" + fP.Name + ": " + fP.Health + "hp<strong/> is winner. <br/><br/>");
            break;
        }
    }
}
window.onload = () => {
    let $firstPlayer = null;
    let $secondPlayer = null;
    let fCheck = false;
    let sCheck = false;
    $("#First").on("click", function (event) {
        $firstPlayer = selectorHero($("#First .active").find('img').attr("alt"));
        $("#name").text("Name_left: " + $firstPlayer.Name);
        $("#hp").text("Health_left: " + $firstPlayer.Health);
        $("#dmg").text("Attack_left: " + $firstPlayer.Attack);
        $("#arm").text("Armour_left: " + $firstPlayer.Armour);
        fCheck = true;
    });
    $("#Second").on("click", function (event) {
        $secondPlayer = selectorHero($("#Second .active").find('img').attr("alt"));
        $("#name").text("Name_right: " + $secondPlayer.Name);
        $("#hp").text("Health_right: " + $secondPlayer.Health);
        $("#dmg").text("Attack_right: " + $secondPlayer.Attack);
        $("#arm").text("Armour_right: " + $secondPlayer.Armour);
        sCheck = true;
    });
    $("#firstPrev").on("click", function (event) {
        sleep(1000).then(() => {
            $firstPlayer = selectorHero($("#First .active").find('img').attr("alt"));
            $("#name").text("Name_left: " + $firstPlayer.Name);
            $("#hp").text("Health_left: " + $firstPlayer.Health);
            $("#dmg").text("Attack_left: " + $firstPlayer.Attack);
            $("#arm").text("Armour_left: " + $firstPlayer.Armour);
            fCheck = true;
        });
    });
    $("#firstNext").on("click", function (event) {
        sleep(1000).then(() => {
            $firstPlayer = selectorHero($("#First .active").find('img').attr("alt"));
            $("#name").text("Name_right: " + $firstPlayer.Name);
            $("#hp").text("Health_right: " + $firstPlayer.Health);
            $("#dmg").text("Attack_right: " + $firstPlayer.Attack);
            $("#arm").text("Armour_right: " + $firstPlayer.Armour);
            fCheck = true;
        });
    });
    $("#secondPrev").on("click", function (event) {
        sleep(1000).then(() => {
            $secondPlayer = selectorHero($("#Second .active").find('img').attr("alt"));
            $("#name").text("Name_right: " + $secondPlayer.Name);
            $("#hp").text("Health_right: " + $secondPlayer.Health);
            $("#dmg").text("Attack_right: " + $secondPlayer.Attack);
            $("#arm").text("Armour_right: " + $secondPlayer.Armour);
            sCheck = true;
        });
    });
    $("#secondNext").on("click", function (event) {
        sleep(1000).then(() => {
            $secondPlayer = selectorHero($("#Second .active").find('img').attr("alt"));
            $("#name").text("Name_right: " + $secondPlayer.Name);
            $("#hp").text("Health_right: " + $secondPlayer.Health);
            $("#dmg").text("Attack_right: " + $secondPlayer.Attack);
            $("#arm").text("Armour_right: " + $secondPlayer.Armour);
            sCheck = true;
        });
    });
    $("#VS").on("click", function (event) {
        if ($firstPlayer === null || fCheck === false) {
            $firstPlayer = selectorHero($("#First .active").find('img').attr("alt"));
        }
        if ($secondPlayer === null || sCheck === false) {
            $secondPlayer = selectorHero($("#Second .active").find('img').attr("alt"));
        }
        $firstPlayer.Name += "_One";
        $secondPlayer.Name += "_Two";
        startBattle($firstPlayer, $secondPlayer);
        fCheck = false;
        sCheck = false;
    });
};
//# sourceMappingURL=app.js.map