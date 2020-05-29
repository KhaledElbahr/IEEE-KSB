 <?php


$regularPattern = array(
    'int'           => '/^[0-9]+$/',
    'email'         => '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/m',
    'arabic'        => '/^[\p{Arabic} ]+$/u',
    'english'       => '/^[a-zA-Z ]+$/',
    'date'          => '/^[1-2][0-9][0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:0[1-9])|(?:(?:1|2)[0-9])|(?:3[0-1]))$/',
    'time'          => '/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/',
    'image'         => '/^[^\?]+\.(jpg|jpeg|gif|png)(?:\?|$)$/',
    'age'           => '/^(?:\b|-)([1-9]{1,2}[0]?|100)\b $/',

);


    function validString($string)
    {
        $word = filter_var($string, FILTER_SANITIZE_STRING);
        return $word;
    }

    function validUrl($url)
    {
        if (filter_var($url, FILTER_VALIDATE_URL))
        {
            return $url;
        } 
        else
        {
            return "";
        }
    }

    function validAge($age)
    {
        global $regularPattern;

        if(preg_match($regularPattern['age'], $age))
        {
            return $age;
        }

        else
        {
            return "";
        }
    }


    function validEmail($mail)
    {
        $email = filter_var($mail, FILTER_SANITIZE_EMAIL);
        return $email;
    }

    function validNumber($num)
    {
        $number = filter_var($num, FILTER_SANITIZE_NUMBER_INT);
        return $number;
    }

    function isDate($date)
    {
        global $regularPattern;

        if(preg_match($regularPattern['date'], $date))
        {
            return $date;
        }

        else
        {
            return "";
        }
    }

    function isTime($time)
    {

        global $regularPattern;

        if(preg_match($regularPattern['time'], $time))
        {
            return $time;
        }

        else
        {
            return "";
        }
    }


    function isImage($image)
    {

        global $regularPattern;

        if(preg_match($regularPattern['image'], $image))
        {
            return $image;
        }
        else
        {
            return "";
        }

    }


    function isEmail($mail)
    {

        global $regularPattern;

        if(preg_match($regularPattern['email'], $mail))
        {
            return $mail;
        }

        else
        {
            return "";
        }
    }

    function isInt($int)
    {

        global $regularPattern;

        if(preg_match($regularPattern['int'], $int))
        {
            return $int;
        }
        else
        {
            return "";
        }
    }

    function isArabic($arabic)
    {

        global $regularPattern;

        if(preg_match($regularPattern['arabic'], $arabic))
        {
            return $arabic;
        }

        else
        {
            return "";
        }
    }

    function isEnglish($english)
    {
        global $regularPattern;
        
        if(preg_match($regularPattern['english'], $english))
        {
            return $english;
        }
        else
        {
            return "";
        }
    }
