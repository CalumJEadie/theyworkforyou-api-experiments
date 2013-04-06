theyworkforyou_key = "EJGTp6C6GFRyDJRPJJBmaJRD"
theyworkforyou_image_root = "http://www.theyworkforyou.com"

output = $("#output")

function getMPs(success) {
    $.getJSON(
        "http://www.theyworkforyou.com/api/getMPs",
        {
            key: theyworkforyou_key,
            output: "js"
        },
        success
    )
}

function getMP(person_id, success) {
    $.getJSON(
        "http://www.theyworkforyou.com/api/getMP",
        {
            key: theyworkforyou_key,
            output: "js",
            id: person_id
        },
        success
    )
}

function getMPInfo(person_id, success) {
    $.getJSON(
        "http://www.theyworkforyou.com/api/getMPInfo",
        {
            key: theyworkforyou_key,
            output: "js",
            id: person_id
        },
        success
    )
}

// Fetching a list of all MPs
// http://www.theyworkforyou.com/api/docs/getMPs

/*$.ajax({
    url: "http://www.theyworkforyou.com/api/getMPs",
    data: {
        key: theyworkforyou_key,
        output: "js"
    },
    success: function(data) {
        mps = data

        output.html = mps
    }
})*/


$(document).ready(function(){

    getMPs(function(data, textStatus, jqXHR){
        console.log(data)

        mp_person_id = data[0].person_id

        getMP(mp_person_id, function(data, textStatus, jqXHR) {
            console.log(data)

            mp = data[0]

            console.log(mp.full_name)
            console.log(mp.image)
            console.log(mp.party)

            mp_image_url = theyworkforyou_image_root + mp.image

            $("#face").attr("src", mp_image_url)
        })

        getMPInfo(mp_person_id, function(data, textStatus, jqXHR) {
            console.log(data)

            mp = data

            console.log(mp.by_member_id)

            for (var member_id in mp.by_member_id) {
                console.log(mp.by_member_id[member_id])
                public_whip_division_attendance = mp.by_member_id[member_id].public_whip_division_attendance
                console.log(public_whip_division_attendance)
                public_whip_division_attendance = parseFloat(public_whip_division_attendance.substring(0, public_whip_division_attendance.length-1))
                console.log(public_whip_division_attendance)
            }
        })
    })


    
})