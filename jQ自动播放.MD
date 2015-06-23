#jQuery中自动播放代码
..
<script type="text/javascript">
		$(function(){
			var index=0;
			setInterval(function(){
				var $index=index;
				index++;
				if(index<7){
				$(".box li").eq($index).show().siblings().hide();
					}else{
						index=0;
					}
			},3000);
		});
	</script>
..	
