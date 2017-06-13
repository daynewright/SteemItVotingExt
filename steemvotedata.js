(function(){
    var name = window.location.href.split('@')[1];
    var today = new Date();

    function addVP() {
        var insertLoc = document.getElementsByClassName("UserProfile__rep")[0];
        var insertVotes = document.getElementsByClassName("UserProfile__stats")[0];

        steem.api.getAccounts([name], function(err, result){
            var votingPowerEl = document.createElement('span');
            votingPowerEl.setAttribute('class', 'UserProfile__rep')
            votingPowerEl.setAttribute('id','Voting__power');
            votingPowerEl.innerText = ` (${result[0].voting_power /= Math.pow(10, 2)}% VP)`;
            insertLoc.parentNode.insertBefore(votingPowerEl, insertLoc.nextSibling);
        });

        steem.api.getAccountVotes(name, function(err, result) {
            var voteDate, formattedDate, formattedToday;
            
            var count = 0;
            for(var i = 0; i < result.length; ++i){
                voteDate = new Date(result[i].time);
                formattedDate = `${voteDate.getMonth()} ${voteDate.getDate()} ${voteDate.getFullYear()}`;
                formattedToday = `${today.getMonth()} ${today.getDate()} ${today.getFullYear()}`;

                if(formattedDate === formattedToday){
                    count++;
                }
            }

            var votingCountEl = document.createElement('span');
            votingCountEl.setAttribute('id', 'Voting__count');
            votingCountEl.innerText = `${count} daily votes`;
            insertVotes.insertBefore(votingCountEl, null);

        });
    }

    function locationHashChanged() {
        setTimeout(function(){
            if(window.location.href.split('@') && window.location.href.split('@')[1].split("/")[0] !== name){
                document.getElementById('Voting__power') ? document.getElementById('Voting__power').remove() : '';
                document.getElementById('Voting__count') ? document.getElementById('Voting__count').remove() : '';
                name = window.location.href.split('@')[1];
                addVP();
            }
        }, 1500);
    }

    document.body.addEventListener("mouseup", locationHashChanged)

    addVP();
})();