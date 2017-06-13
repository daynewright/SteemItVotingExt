(function(){
    var name = window.location.href.split('@')[1];

    function addVP() {
        var insertLoc = document.getElementsByClassName("UserProfile__rep")[0];

        steem.api.getAccounts([name], function(err, result){
            var votingPowerEl = document.createElement('span');
            votingPowerEl.setAttribute('class', 'UserProfile__rep')
            votingPowerEl.setAttribute('id','Voting__power');
            votingPowerEl.innerText = ` (${result[0].voting_power /= Math.pow(10, 2)}% VP)`;
            insertLoc.parentNode.insertBefore(votingPowerEl, insertLoc.nextSibling);
        });
    }

    function locationHashChanged() {
        setTimeout(function(){
            if(window.location.href.split('@') && window.location.href.split('@')[1].split("/")[0] !== name){
                document.getElementById('Voting__power') ? document.getElementById('Voting__power').remove() : '';
                name = window.location.href.split('@')[1];
                addVP();
            }
        }, 1500);
    }

    document.body.addEventListener("mouseup", locationHashChanged)

    addVP();
})();