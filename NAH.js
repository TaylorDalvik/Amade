let hbx = 0.8;
let hby = 1.8;
let time = 4;

function onLevelTick() {
    time--;
    if (time === 0) {
        time = 4;
        updatePlayersCollisionSize();
    }
}

function updatePlayersCollisionSize() {
    let hp = LocalPlayer.getHealth();
    let extrhh = hp_to_hb(hp);
    var p = Level.getAllPlayers();
    var uid = LocalPlayer.getUniqueID();
    Player.setCollisionSize(uid, 0.6, 1.8);
    var index = p.indexOf(uid);
    if (index !== -1) p.splice(index, 1);

    for (let i = 1; i < p.length - 1; i++) {
        let name = Player.getNameTag(p[i]);
        if (!isBot(p[i])) {
            let extr = LocalPlayer.getHealth();
            if (Player.canShowNameTag(p[i])) {
                let collisionSizeModifier = 0;

                if (name.includes("PC§")) {
                    collisionSizeModifier = 0.4;
                } else if (name.includes("GP✔") || name.includes("GP§")) {
                    collisionSizeModifier = 0.2;
                } else {
                    collisionSizeModifier = 0;
                }
                Player.setCollisionSize(p[i], hbx + collisionSizeModifier + extrhh, hby);
             Player.setShadowRadius(p[i], 0.6);
            }
        } else {
            Player.setCollisionSize(p[i], 0, 0);
        }
    }
}

function hp_to_hb(x) {
    const minX = 5;
    const maxX = 20;
    const minY = 0;
    const maxY = 0.5;
    if (x >= maxX) {
        return minY;
    } else if (x <= minX) {
        return maxY;
    } else {
        return minY + (maxY - minY) * ((maxX - x) / (maxX - minX));
    }
}

function isBot(target) {
    let n = Player.getNameTag(target).trim();
    if (Player.isInvisible(target) || 
        (n.startsWith("§c") && n.split("§").length === 3) || Player.isInWall(target)) {
        return true;
    }
    return false;
}
