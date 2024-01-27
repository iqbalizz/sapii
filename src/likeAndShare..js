import fetch from "node-fetch";

export const likesLive = (sessionId) => new Promise((resolve, reject) => {
    fetch(`https://live.shopee.co.id/api/v1/session/${sessionId}/like`, {
        method: "POST",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Cookie': 'REC_T_ID=2a0a3790-ae2b-11ee-95de-e2ce022df7f9; _gcl_au=1.1.286947942.1704721130; _fbp=fb.2.1704721130525.1159782840; _ga=GA1.1.1321665326.1704721131; _ga_SW6D8G0HXK=GS1.1.1704758615.3.1.1704759752.60.0.0; _gid=GA1.3.1234733434.1704721131; SPC_F=2A60B6B02D1F428EB6E6480EF0B29E83; shopee_token=wbRh1gGKRzawXY67OnnTicRPdFomd5YBrdFd0wbznk1Ynz0ZbZnmeaeFXkOpkY5a; shopid=1159104017; userid=1159431351; username=awancu; SPC_AFTID=LAT; SPC_CLIENTID=MkE2MEI2QjAyRDFGaunlkvzgzhdfgcej; csrftoken=OPY1BLnCiSM7M5Hj1N2GEQdBXMM86mLu; shopee_app_version=31524; shopee_rn_bundle_version=6002003; shopee_rn_version=1704780762; SPC_B_SI=1sqTZQAAAABDZm5PZ1BXY6EmTgAAAAAAMm1HRHR4NWQ=; SPC_ST=.NWVKNGRVY3VSaTg0aXlxYbxqxpLSATsK6amaLoZOMQemr3K2Z+N6k3nKra80IIA62rRwBZXEck8MNbNT5RS6vN5GvbIBOediVLQW6nf17EXWzJmVmLpSCZBthzMZ6bpk4KUIMQaEePvN3q4UchErkQzn0L3ltZLABYXwzm4ZiLf2eriMSQOKCHK7JXg5LBAHqVlaxQggYd5J7oO1k3COjw==; SPC_U=1159431351; SPC_EC=.NWVKNGRVY3VSaTg0aXlxYbxqxpLSATsK6amaLoZOMQemr3K2Z+N6k3nKra80IIA62rRwBZXEck8MNbNT5RS6vN5GvbIBOediVLQW6nf17EXWzJmVmLpSCZBthzMZ6bpk4KUIMQaEePvN3q4UchErkQzn0L3ltZLABYXwzm4ZiLf2eriMSQOKCHK7JXg5LBAHqVlaxQggYd5J7oO1k3COjw==; SPC_R_T_ID=P/Z025vtP8SRFIypV/CUF+CRLw1IucHjmqOBI7gQYkGdXY5zKE3SWksGtIf+JSvmnXP2kc585uLkMJhmsJh7qF7Htq3BEijYZ+lOTc7uqtpLNeaikVBfwtxdxbyo9uzqcJbVrXab4GZ38LK9X1NjiTFIRYLQM4xVsoo8wU0Snas=; SPC_R_T_IV=MTJhdGViTm9lVG1vVXY3TA==; SPC_T_ID=P/Z025vtP8SRFIypV/CUF+CRLw1IucHjmqOBI7gQYkGdXY5zKE3SWksGtIf+JSvmnXP2kc585uLkMJhmsJh7qF7Htq3BEijYZ+lOTc7uqtpLNeaikVBfwtxdxbyo9uzqcJbVrXab4GZ38LK9X1NjiTFIRYLQM4xVsoo8wU0Snas=; SPC_T_IV=MTJhdGViTm9lVG1vVXY3TA==; SPC_SI=JMiTZQAAAABIM284SURqVtlFTgAAAAAAZ1MyU0x0aHU=',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            like_cnt: 2
        })
    })
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
});

export const sharesLive = (sessionId) => new Promise((resolve, reject) => {
    fetch(`https://live.shopee.co.id/api/v1/session/${sessionId}/msg/share`, {
        method: "POST",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "share_to": "2"
        })
    })
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
})