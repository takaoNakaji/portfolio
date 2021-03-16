$(function () {

	// スムーススクロール
	$('a[href^="#"]').click(function () {
		// スクロールの速度
		let speed = 400; // ミリ秒で記述
		let href = $(this).attr("href");
		let target = $(href == "#" || href == "" ? 'html' : href);
		let position = target.offset().top;
		$('body,html').animate({
			scrollTop: position
		}, speed, 'swing');
		return false;
	});

	// モバイル用メニューボタンでナビゲーションを開閉
	$(".menu-btn").on("click", function () {
		// モバイルメニューの位置を設定するための変数
		var rightVal = 0;
		// openクラスを持っていたら
		if ($(this).hasClass("open")) {
			rightVal = -300;
			// openクラスを削除
			$(this).removeClass("open");
		} else {
			// openクラスを追加
			$(this).addClass("open");
		}
		// アニメーションでメニューの表示位置を設定
		$(".menu").stop().animate({
			right: rightVal
		}, 300);
	});

	// ページトップへスクロール
	var pagetop = $('.pagetop');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});

	// モーダルウィンドウの開閉
	$('.js-modal-open').each(function () {
		$(this).on('click', function () {

			// 無駄な要素の削除
			$('#menu-btn').toggleClass('menu-btn');
			$('#github-icon').toggleClass('github-icon');
			$('#pagetop').toggleClass('pagetop');

			// メイン画像の初期化
			$('#main-image01 img').attr('src', "images/stcheck_top.png");
			$('#main-image02 img').attr('src', "images/portfolio_top.png");
			
			// サムネ画像の影の初期化
			$('.sub-image img').addClass('z-depth-2');
			$('#sub-image01 img').eq(0).removeClass('z-depth-2');
			$('#sub-image02 img').eq(0).removeClass('z-depth-2');
			
			var target = $(this).data('target');
			var modal = document.getElementById(target);
			$(modal).fadeIn();

			return false;
		});
	});
	$('.js-modal-close').on('click', function () {

		$('.js-modal').fadeOut();

		// 削除していた要素を復活
		$('#menu-btn').toggleClass('menu-btn');
		$('#github-icon').toggleClass('github-icon');
		$('#pagetop').toggleClass('pagetop');

		return false;
	});

	// サムネ画像をクリックでメイン画像切り替え
	$('.sub-image img').on('click', function () {
		//mainに切り替えるimgのsrc取得
		img = $(this).attr('src');
		//currentクラス付け替え
		$('.sub-image li').removeClass('current');
		$(this).parent().addClass('current');
		//fadeOutできたらsrc変更してfadeIn
		$('.main-image img').fadeOut(50, function () {
			$('.main-image img').attr('src', img).on('load', function () {
				$(this).fadeIn();
			})
		})
	});

	// サムネ画像をクリックで影を切り替え
	$('.thumbnails img').click(function () {
		var $thisModalId = $(this).closest("[id^=modal]").attr('id');
		var $thisImg = $(this).attr('src');
		console.log($thisImg)
		var $thisAlt = $(this).attr('alt');
		$('#' + $thisModalId + ' .main-image img').attr({
			src: $thisImg,
			alt: $thisAlt
		});
		if ($(this).hasClass('z-depth-2')) {
			$('#' + $thisModalId + ' .thumbnails img').not('.z-depth-2').addClass('z-depth-2');
			$(this).removeClass('z-depth-2');
		}
	})

});
