#include <stdio.h>
main() {
    int a=120;
    while(1) {
        if((a%2==0)||(a%3==0)) /* 2, 3의 배수중 둘 중 하나가 참이라면 */ 
        a=a/2; /* 2를 계속 나눔 */
        else
        break;
    }
    printf("%d", a);
}
