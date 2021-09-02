const inputDate = document.querySelector("#date-of-birth");
const checkbtn = document.querySelector("#butt-on");
const output = document.querySelector("#out-put");

function reverseStr(str)
{
    var charList = str.split('');
    var reversedList = charList.reverse();
    var reversedstr =reversedList.join('')
    return reversedstr;
}

function ispalindrome(str)
{
      let condition = false;
   
if(str === reverseStr(str))
   {
     condition=true;
   }
   return condition;
}

function converttoStr(date)
{
    var dateStr = {day:"",month:"", year:""};

    if(date.day < 10)
    {
         dateStr.day = "0"+ date.day;
    } else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10)
    {
         dateStr.month = "0"+ date.month;
    } else{
        dateStr.month = date.month.toString();
    }
dateStr.year = date.year.toString();

return dateStr;
}

function dateFormats(date)
{
    var datestr = converttoStr(date);
    var ddmmyyyy = datestr.day+datestr.month+datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year;
    var yyyymmdd = datestr.year+datestr.month+datestr.day;
    var ddmmyy = datestr.day+datestr.month+datestr.year.slice(-2);
    var mmddyy = datestr.month+datestr.day+ datestr.year.slice(-2);
    var yymmdd = datestr.year.slice(-2)+datestr.month+datestr.day;

    return [ddmmyy,ddmmyyyy,mmddyyyy,yyyymmdd,mmddyy,yymmdd]
}
function checkalldateFormats(date)
{
    var alltypedatesArray = dateFormats(date);
    var flag = false;
    for(var i =0; i< alltypedatesArray.length;i++)
    {
     var currentType =alltypedatesArray[i];
        if(ispalindrome(currentType))
        {
            flag = true;
            break;
        }
    }
   return flag;
}


function isLeapyear(year)
{
    if(year % 400 === 0)
    {
        return true;
    }
    if(year % 100 === 0)
    {
        return false;
    }
    if(year % 4 === 0)
    {
        return true;
    }
    return false;
}

function nextDate(date)
{
    var day = Number(date.day) + 1;
    var month = date.month;
    var year = date.year;

    var daysinMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2)
    {
       if(isLeapyear(year))
       {
           if(day > 29)
           {
               day = 1;
               month++;

           }
       }else
       {
        if(day > 28)
        {
            day = 1;
            month++;

        }
       }
    }
    else{

        if(day > daysinMonth[month-1])
        {
          day = 1;
          month++;
        }
        if(month > 12)
        {
            month=1;
            year++;
        }
    }
    return {
        day:day,
        month:month,
        year:year,
    }
}
function getNextPalindromeDate(date){

    var count = 0;
    var nxtdate = nextDate(date);

    while(1)
    {
        count ++;
        if(checkalldateFormats(nxtdate))
        {
             break;
             
        }
       nxtdate = nextDate(nxtdate);

    }
    
   return [count,nxtdate];
  }

 

  function clickHandler(e)
  {
      var dateArr =inputDate.value.split("-");

      var date =
      {
          day: Number(dateArr[2]),
          month:Number(dateArr[1]),
          year:Number(dateArr[0])
      }
     
      var checkpalindrome= checkalldateFormats(date);

      if(checkpalindrome)
      {
          output.innerText = "Yay you Birthday is Palindrome";
      }
      else
      {
          var nextPalindromeDate = getNextPalindromeDate(date);
          output.innerText = "You missed by "+ nextPalindromeDate[0] +" Days"+"Date "+nextPalindromeDate[1].day;
      }
  }



checkbtn.addEventListener("click", clickHandler);