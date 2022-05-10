#include <stdio.h>
main() {
    int sum=0, k=1;
    while (k<=10) {
        if(k%2==0) /* sum은 2의 배수 밖에 못 구함 */   
        sum=sum+k;
        k=k+1;     /* k는 계속 1씩 증가함  */ 
    }
    printf("sum = %d\n", sum); /* 2의 배수인 수를 10까지 다 더함(30) */
    printf("k = %d\n", k); /* k는 끝나는 지점을 보여줌(11) */ 
}
