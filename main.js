// Print to console
function m_console(m) {
    //document.getElementById("console").innerHTML += m + "<br>";
    console.log(m);
}

// Get the outer HTML representation of the <li> element for the 
// key-value pair (`key`, `val`) with optional human-readable name `key_name`
function get_key_li(key, key_name, val)
{
    return "<li id='key|" + key + "'><span class='key'>" + key_name + "</span><span class='val'>" + val + "</span></li>";
}

// Load all the keys initially
function loadKeys() {
    var keys = NetworkTables.getKeys();
    var list = $("#global-list");
    keys.sort();
    list.empty();

    for(var key = 0; key < keys.length; key++) {
        if(keys[key].substring(0, 16) == "/SmartDashboard/") {
            val = NetworkTables.getValue(keys[key]);
            if(val) {
                list.append(get_key_li(keys[key], keys[key].substr(16), val));
            }
        }
    }
}

function search_global() {
    var children = $("#global-list").children();
    var match = $("#global-search").val().toLowerCase();
    for(var idx = 0 ; idx < children.length; idx++) {
        if(children[idx].id.substring(4).toLowerCase().includes(match)) {
            children[idx].style.display = "block";
        } else {
            children[idx].style.display = "none";
        }
    }
}

var last_socket_state = false;
var last_robot_state = false;
function main() {
    NetworkTables.addWsConnectionListener(function(c) {
        if(c) {
            m_console("Connected to websocket");
            if(!last_socket_state) {
                loadKeys();
            }
        } else {
            m_console("Disconnected from websocket");
        }
        last_socket_state = c;
    }, true);
    
    NetworkTables.addRobotConnectionListener(function(c) {
        if(c) {
            m_console("Connected to robot");
            if(!last_robot_state) {
                loadKeys();
            }
        } else {
            m_console("Disconnected from robot");
        }
        last_robot_state = c;
    }, true);

    setInterval(function() {
        
    });
}
