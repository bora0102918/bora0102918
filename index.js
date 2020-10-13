$(function () {

    // top

    $(window).scroll(function () {
        var sc = $(this).scrollTop();
        if (sc > 150) {
            $("nav").addClass("fixed");
        } else {
            $("nav").removeClass("fixed");
        }
    });



    //check
    $('#chkbox1, #chkbox3, #chkbox5').click(function () {
        $("input[id=chkbox2]:checkbox").prop("checked", false);
        $("input[id=chkbox4]:checkbox").prop("checked", false);
        $("input[id=chkbox6]:checkbox").prop("checked", false);
    });
    $('#chkbox2, #chkbox4, #chkbox6').click(function () {
        $("input[id=chkbox1]:checkbox").prop("checked", false);
        $("input[id=chkbox3]:checkbox").prop("checked", false);
        $("input[id=chkbox5]:checkbox").prop("checked", false);
    });


    // alert

    $(".e2-pop .pop1 .next").click(function () {
        if ($("#chkbox1").is(":checked")) {
            alert("똘똘하게 체크 리스트 확인 완료!");
        } else {
            alert("다시 한번 생각해보세요!");
            return ture;
        }
    });


    $(".e2-pop .pop2 .next").click(function () {
        if ($("#chkbox4").is(":checked")) {
            alert("똘똘하게 체크 리스트 확인 완료!");
        } else {
            alert("다시 한번 생각해보세요!");
            return ture;
        }
    });



    $(".e2-pop .pop3 .okay").click(function () {
        if ($("#chkbox5").is(":checked")) {
            alert("똘똘하게 체크 리스트 확인 완료!");
        } else {
            alert("다시 한번 생각해보세요!");
            return ture;
        }
    });


    //alert-info 




    $(".phone-number-check").on('keydown', function (e) {
        // 숫자만 입력받기
        var trans_num = $(this).val().replace(/-/gi, '');
        var k = e.keyCode;

        if (trans_num.length >= 11 && ((k >= 48 && k <= 126) || (k >= 12592 && k <= 12687 || k == 32 || k == 229 || (k >= 45032 && k <= 55203)))) {
            e.preventDefault();
        }
    }).on('blur', function () { // 포커스를 잃었을때 실행합니다.
        if ($(this).val() == '') return;

        // 기존 번호에서 - 를 삭제합니다.
        var trans_num = $(this).val().replace(/-/gi, '');

        // 입력값이 있을때만 실행합니다.
        if (trans_num != null && trans_num != '') {
            // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
            if (trans_num.length == 11 || trans_num.length == 10) {
                // 유효성 체크
                var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                if (regExp_ctn.test(trans_num)) {
                    // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                    trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
                    $(this).val(trans_num);
                } else {
                    alert("연락처를 확인해주세요");
                    $(this).val("");
                    $(this).focus();
                }
            } else {
                alert("연락처를 확인해주세요");
                $(this).val("");
                $(this).focus();
            }
        } else {
            alert("연락처를 확인해주세요");
        }
    });



    //nav


    $('.evt01').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".event01-1").offset().top - 160
        }, 500);
        $("header .gnb").addClass("nav1");
        $("header .gnb").removeClass("nav2");
        $("header .gnb").removeClass("nav3");

    });
    $('.evt02').on('click', function () {
        $('html, body').animate({
            scrollTop: $(".event02-1").offset().top - 75
        }, 500);

        $("header .gnb").addClass("nav2");
        $("header .gnb").removeClass("nav1");
    });

    $('.evt03').on('click', function () {
        $("header .gnb").addClass("nav3");
        $("header .gnb").removeClass("nav2");
    });

    // main 


    $(".main-kv .add .open").click(function () {
        $("#pop-wrap").addClass("on");
        $(".pop-kv").addClass("on");

    });

    $(".main-kv .close").click(function () {
        $(".main-kv .add").hide();
    });

    $(".exit").click(function () {
        $("#pop-wrap").removeClass("on");
        $(".pop-kv").removeClass("on");
    });



    //하나만 선택, 체크박스





    // on



    $(".ok1").on("click", function () {

        $(".ok1").addClass("click-ok");


    });

    $(".ok2").on("click", function () {

        $(".ok2").addClass("click-ok");

    });

    $(".ok3").on("click", function () {

        $(".ok3").addClass("click-ok");

    });

    $(".ok4").on("click", function () {

        $(".ok4").addClass("click-ok");


    });
    $(".ok li").on("click", function () {

        if ($(".ok li.click-ok").length >= 8) {

            $(".e1-pop  .pop1").removeClass("on");
            $(".e1-pop  .pop2").addClass("on");
        }

    });




    //close


    $(".exit").click(function () {
        $(".pop1, .pop2, .pop3, .pop-info, .pop-last").removeClass("on");

    });


    // event01



    $(".event01-1 .join").click(function () {
        $("#pop-wrap").addClass("on");
        $(".e1-pop .pop1").addClass("on");
        $(".ok li").removeClass("click-ok");

    });



    $(".e1-pop .pop2 .join2").click(function () {
        $(".e1-pop .pop-info").addClass("on");
        $(".e1-pop .pop2").removeClass("on");

    });

    $(".e1-pop .pop-info .okay").click(function () {
        if ($("#chkbox0").is(":checked")) {

            if ($(".name-check").val() == '') {
                alert("정보를 입력해주세요!");

                return ture;
            } else if ($(".phone-number-check").val() == '') {
                alert("정보를 입력해주세요!");
                return ture;
            } else {
                alert("참여가 완료되었습니다");
                $(".e1-pop .pop-last").addClass("on");
                $(".e1-pop  .pop-info").removeClass("on");
            }




        } else {
            alert("개인 정보 취급/이용 약관에 동의해주세요");
            return true;
        }








    });
    $(" .pop-last .okay").click(function () {
        $(" .pop-last").removeClass("on");
        $("#pop-wrap").removeClass("on");
    });

    // event02
    $(".event02-1 .join").click(function () {
        $("#pop-wrap").addClass("on");
        $(".e2-pop .pop1").addClass("on");
    });

    $(".e2-pop .pop1 .next").click(function () {
        $(".e2-pop .pop2").addClass("on");
        $(".e2-pop .pop1").removeClass("on");
    });

    $(".e2-pop .pop2 .next").click(function () {
        $(".e2-pop .pop3").addClass("on");
        $(".e2-pop .pop2").removeClass("on");
    });

    $(".e2-pop .pop3 .okay").click(function () {
        $(".e2-pop .pop-info").addClass("on");
        $(".e2-pop .pop3").removeClass("on");
    });


    $(".e2-pop .pop-info .okay").click(function () {
        if ($("#chkbox0").is(":checked")) {

            if ($(".name-check").val() == '') {
                alert("정보를 입력해주세요!");

                return ture;
            } else if ($(".phone-number-check").val() == '') {
                alert("정보를 입력해주세요!");
                return ture;
            } else {
                alert("참여가 완료되었습니다");
                $(".e2-pop .pop-last").addClass("on");
                $(".e2-pop  .pop-info").removeClass("on");
            }




        } else {
            alert("개인 정보 취급/이용 약관에 동의해주세요");
            return true;
        }



    });
    $(".e2-pop .pop-last .okay").click(function () {
        $(".e2-pop .pop-last").removeClass("on");



    });

    $(".pop1, .pop2, .pop3, .pop-info, .pop-last").removeClass("on");









});
